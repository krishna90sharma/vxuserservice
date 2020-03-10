import { APIGatewayProxyHandler } from 'aws-lambda'
import { LambdaResponseTrait } from '@alpha/alpha-framework/dist/Traits'

import { errorValidate, parsePaginate } from '../../../../infrastructure/Helpers'
import { APIGatewayCustomProxyEvent } from '../../../../infrastructure/Type'
import RolesService from '../../Roles/Services/RolesService'
import IoTServices from '../../../../infrastructure/Services/IoTServices'
import OrganizationsService from '../../Organizations/Services/OrganizationsService'
import { PERMISSION_CUSTOMER_DEFAULT, SALTROUNDS, THUMBNAIL_DEFAULT, TYPE } from '../../../../infrastructure/constanst'
import ThumbnailsService from '../../Thumbnails/Services/ThumbnailsService'
import getRoleAndPermission from '../../Users/Utils'
import User from '../../Users/Entities/User'
import CustomerService from '../Services/CustomerService'
import { ORGANIZATION_SETTING_SEEDER } from '../../../../infrastructure/constanst/seeder'
import { createRequest, updateRequest } from '../Requests'
import { UserService } from '../../Users/Services'
import bcrypt from 'bcryptjs'
import SummaryService from '../../Summary/Services/SummaryService'

const { success, error } = LambdaResponseTrait
const customersService = new CustomerService()
const roleService = new RolesService()
const organizationsService = new OrganizationsService()
const thumbnailService = new ThumbnailsService()
const userService = new UserService()
const ioTServices = new IoTServices()
const summaryService = new SummaryService()
const salt = bcrypt.genSaltSync(SALTROUNDS)

export const index: APIGatewayProxyHandler = async (event: APIGatewayCustomProxyEvent, {}) => {
  const { page = '1', keyword = '' } = event.queryStringParameters || {}
  const { requestContext: { authorizer: { user } } } = event
  const userParse = JSON.parse(user)
  const { id: user_id, organization_id } = userParse
  const options = {
    page: parseInt(page, 10) > 0 ? page : 1,
    keyword,
    create_by: user_id,
    organization_id,
    type: TYPE.CUSTOMER
  }
  try {
    const data = await customersService.find(options)
    const listRole = await data[0].map(async (user: User) => {
      let role = {}
      const organization = await organizationsService.getOrganizationByUserId(user.id, TYPE.CUSTOMER)

      if (organization) {
        role = await roleService.findRoleByUserAndOrganization(user.id, organization.id)
      }
      user.role = role || null
      user.organization = organization || null
      user.thumbnail = user.thumbnail_id ? await thumbnailService.show(user.thumbnail_id) : THUMBNAIL_DEFAULT

      return user
    })

    data[0] = await Promise.all(listRole)
    const result = parsePaginate(data, page)

    return success(result)
  } catch (e) {
    return error(e.message || e.detail, 422)
  }
}

export const create: APIGatewayProxyHandler = async (event: APIGatewayCustomProxyEvent, {}) => {
  const { body, requestContext: { authorizer: { user } } } = event
  const auth = JSON.parse(user)
  const bodyParse = JSON.parse(body)
  const { id: currentUserId, organization_id: currentOrganizationId } = auth
  const { thumbnail, organization_name, organization_address, ...userData } = bodyParse
  const { email, password } = userData
  const organizationData = {
    name: organization_name ? organization_name : 'VX CUSTOMER',
    type: TYPE.CUSTOMER,
    address: organization_address ? organization_address : '',
    setting_id: null,
    create_by: currentUserId,
    updated_by: currentUserId
  }

  try {
    const validate = createRequest.validate(userData)
    if (validate.length) {
      return errorValidate(validate)
    }

    const emailExists = await customersService.checkEmailExists({ email })
    if (emailExists) {
      return error('Email already exists', 422)
    }

    if (thumbnail) {
      const { path, name, original_path, size = '300x300', format = 'image/JGP' } = thumbnail
      const thumbnailData = { path, original_path, size, format, name }
      const newThumbnail = await thumbnailService.store(thumbnailData)
      const thumbnailOrganization = await thumbnailService.store(thumbnailData)
      Object.assign(userData, { thumbnail_id: newThumbnail ? newThumbnail.identifiers[0].id : null })
      Object.assign(organizationData, { thumbnail_id: thumbnailOrganization ? thumbnailOrganization.identifiers[0].id : null })
    }
    const hashPassword = bcrypt.hashSync(password, salt)
    Object.assign(userData, {
      create_by: currentUserId,
      updated_by: currentUserId,
      password: hashPassword
    })

    const user = await customersService.store(userData)
    const organizationSetting = await organizationsService.storeSetting(ORGANIZATION_SETTING_SEEDER)

    organizationData.setting_id = organizationSetting.identifiers[0].id
    const organization = await organizationsService.store(organizationData)
    const user_id = user ? user.identifiers[0].id : null
    const organization_id = organization ? organization.identifiers[0].id : null

    if (user_id && organization_id) {
      const organizationUser = { user_id, organization_id }
      const roleData = {
        name: 'Super Admin',
        created_by_user: user_id,
        organization_id,
        display_name: 'Super Admin',
      }
      const role = await roleService.store(roleData)
      const role_id = role.identifiers[0].id
      await roleService.attachUserRole({ role_id, user_id })
      await roleService.attachPermissionDefault({ role_id, permissions: PERMISSION_CUSTOMER_DEFAULT })
      await organizationsService.attachOrganization(organizationUser)

      const dataSummary = {
        create_by: currentUserId,
        organization_id: currentOrganizationId,
        type: TYPE.CUSTOMER
      }
      const customerCount = await summaryService.countCustomerOrDistributorActive(dataSummary)
      await ioTServices.publishData({ topic: `organization/${currentOrganizationId}/summary`, customer: customerCount })

      return success(organizationUser)
    }
  } catch (e) {
    return error(e.detail || e.message || 'SOMETHING_WENT_WRONG', 422)
  }
}

export const show: APIGatewayProxyHandler = async (event: APIGatewayCustomProxyEvent, {}) => {
  const { pathParameters: { customer_id } } = event
  const customerId: number = parseInt(customer_id, 10)

  try {
    const user = await customersService.show(customerId, TYPE.CUSTOMER)

    if (user) {
      const organization = await organizationsService.getOrganizationByUserId(user.id, TYPE.CUSTOMER)
      if (organization) {
        user.organization = organization
        user.thumbnail = user.thumbnail_id ? await thumbnailService.show(user.thumbnail_id) : null
        user.sub = await userService.countSubUser({
          type: TYPE.CUSTOMER,
          create_by: customer_id,
          organization_id: organization.id
        })
        await getRoleAndPermission({ user, userId: customer_id, organizationId: organization.id })
        return success(user)
      }
    }

    return error('DATA_NOT_FOUND')
  } catch (e) {
    console.log(e)
    return error(e.detail || e.message, 500)
  }
}

export const update: APIGatewayProxyHandler = async (event: APIGatewayCustomProxyEvent, {}) => {
  const { body, pathParameters: { customer_id }, requestContext: { authorizer: { user } } } = event
  const userData = JSON.parse(body)
  const auth = JSON.parse(user)
  const { id: currentUserId, organization_id: currentOrganizationId } = auth
  const { organization_name, organization_address, password, email } = userData
  let { thumbnail } = userData

  const customerId: number = parseInt(customer_id, 10)

  const validate = updateRequest.validate(userData)
  if (validate.length) {
    return errorValidate(validate)
  }

  try {
    if (email) {
      const emailExists = await customersService.checkEmailExists({ email, id: customer_id })
      if (emailExists) {
        return error('Email already exists', 422)
      }
    }

    const customer = await customersService.show(customerId, TYPE.CUSTOMER)
    const organization = await organizationsService.getOrganizationByUserId(customer.id, TYPE.CUSTOMER)

    if (organization_name || organization_address) {
      const organizationData = {
        name: organization_name,
        address: organization_address,
        type: TYPE.CUSTOMER
      }
      const updateOrganization = await organizationsService.update(organization.id, organizationData)

      if (!updateOrganization) {
        return error('UPDATE ORGANIZATION FAILED', 400)
      }
    }

    if (customer) {
      if (thumbnail) {
        const { id, path, name, original_path, size = '300x300', format = 'image/JGP' } = thumbnail
        const thumbnailData = { path, original_path, size, format, name }
        userData.thumbnail_id = await thumbnailService.update(id, thumbnailData)
      }

      Object.assign(userData, { updated_by: auth.id })
      if (password) {
        const hashPassword = bcrypt.hashSync(password, salt)
        Object.assign(userData, { password: hashPassword })
      }
      const updated = await customersService.update(customerId, userData)

      const dataSummary = {
        create_by: currentUserId,
        organization_id: currentOrganizationId,
        type: TYPE.CUSTOMER
      }
      const customerCount = await summaryService.countCustomerOrDistributorActive(dataSummary)
      await ioTServices.publishData({ topic: `organization/${currentOrganizationId}/summary`, customer: customerCount })

      if (updated) {
        return success(userData)
      }

      return error('SOMETHING_WENT_WRONG', 500)
    }

    return error('DATA_NOT_FOUND')
  } catch (e) {
    console.log(e)
    return error(e.detail || e.message, 500)
  }
}
