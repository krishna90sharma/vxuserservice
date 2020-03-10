import { APIGatewayProxyHandler } from 'aws-lambda'
import { InsertResult } from 'typeorm'
import _ from 'lodash'
import { LambdaResponseTrait } from '@alpha/alpha-framework/dist/Traits'
import { errorValidate, parsePaginate } from '../../../../infrastructure/Helpers'
import { APIGatewayCustomProxyEvent } from '../../../../infrastructure/Type'
import IoTServices from '../../../../infrastructure/Services/IoTServices'

import User from '../Entities/User'
import { UserService } from '../Services'
import RolesService from '../../Roles/Services/RolesService'
import PermissionsService from '../../Permissions/Services/PermissionsService'
import OrganizationsService from '../../Organizations/Services/OrganizationsService'
import ThumbnailsService from '../../Thumbnails/Services/ThumbnailsService'
import SummaryService from '../../Summary/Services/SummaryService'
import getRoleAndPermission from '../Utils'
import {
  CREATE_NEW_ROLE, PERMISSION_CUSTOMER_DEFAULT, PERMISSION_DISTRIBUTOR_DEFAULT,
  PERMISSION_SYSADMIN_DEFAULT,
  PERMISSIONS,
  SALTROUNDS,
  THUMBNAIL_DEFAULT,
} from '../../../../infrastructure/constanst'
import {
  ORGANIZATION_DEFAULT,
  ORGANIZATION_USER_DEFAULT,
  ROLE_DEFAULT,
  SYS_USER,
  USER_ROLE_DEFAULT,
  ORGANIZATION_SETTING_SEEDER
} from '../../../../infrastructure/constanst/seeder'
import { createRequest, updateRequest } from '../Requests'
import bcrypt from 'bcryptjs'

const { success, error } = LambdaResponseTrait
const userService = new UserService()
const roleService = new RolesService()
const permissionService = new PermissionsService()
const organizationsService = new OrganizationsService()
const thumbnailService = new ThumbnailsService()
const ioTServices = new IoTServices()
const summaryService = new SummaryService()

export const index: APIGatewayProxyHandler = async (event: APIGatewayCustomProxyEvent, {}) => {
  const { page = '1', keyword = '' } = event.queryStringParameters || {}
  const { requestContext: { authorizer: { user } } } = event
  const userParse = JSON.parse(user)
  const { organization_id, id: user_id, organization_type } = userParse
  const options = {
    page: parseInt(page, 10) > 0 ? page : 1,
    keyword,
    create_by: user_id,
    organization_id
  }
  try {
    const data = await userService.find(options)
    const listRole = await data[0].map(async (user: User) => {
      const { thumbnail_id } = user
      let role = {}
      const organization = await organizationsService.getOrganizationByUserId(user.id, organization_type)

      if (organization) {
        role = await roleService.findRoleByUserAndOrganization(user.id, organization.id)
      }
      user.role = role || null
      user.organization = organization || null
      user.thumbnail = thumbnail_id ? await thumbnailService.show(thumbnail_id) : THUMBNAIL_DEFAULT

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
  const userParse = JSON.parse(user)
  const bodyParse = JSON.parse(body)
  const { organization_id, id: currentUserId } = userParse
  const { role_name, thumbnail, ...userData } = bodyParse
  const { role_id, email, permissions = [], password } = userData
  const newRole = !!role_id ? role_id === CREATE_NEW_ROLE : false

  try {
    const validate = createRequest.validate(userData)
    if (validate.length) {
      return errorValidate(validate)
    }

    const emailExists = await userService.checkEmailExists({ email })
    if (emailExists) {
      return error('Email already exists', 422)
    }
    if (role_id && role_id !== CREATE_NEW_ROLE) {
      const role = await roleService.show(role_id)
      if (!role) {
        return error('Role not exists', 422)
      }
    }

    if (newRole) {
      if (!role_name) {
        return error('Role name not null', 422)
      }
      userData.role_id = await createNewRole(bodyParse, userParse)
    }

    if (thumbnail) {
      const { path, name, original_path, size = '300x300', format = 'image/JGP' } = thumbnail
      const thumbnailData = { path, original_path, size, format, name }
      const newThumbnail = await thumbnailService.store(thumbnailData)
      userData.thumbnail_id = newThumbnail.identifiers[0].id
    }

    const hashPassword = bcrypt.hashSync(password, SALTROUNDS)
    Object.assign(userData, {
      password: hashPassword,
      create_by: currentUserId,
      updated_by: currentUserId
    })

    const user = await userService.store(userData)
    const user_id = user.identifiers[0].id

    const dataSummary = {
      create_by: currentUserId,
      organization_id,
    }
    const usersCount = await summaryService.countUserActive(dataSummary)
    await ioTServices.publishData({ topic: `organization/${organization_id}/summary`, users: usersCount })

    if (user) {
      if (permissions.length || role_id !== null) {
        const dataAttach = { user_id, role_id: userData.role_id, permissions, organization_id, newRole }
        await attachRolePermission(dataAttach)
      }

      return success({ user_id })
    }
  } catch (e) {
    return error(e.detail || e.message, 422)
  }
}

export const show: APIGatewayProxyHandler = async (event: APIGatewayCustomProxyEvent, {}) => {
  const { pathParameters: { user_id }, requestContext: { authorizer: { user } } } = event
  const userParse = JSON.parse(user)
  const { organization_id: organizationId } = userParse

  try {
    const user = await userService.show(user_id)

    if (user) {
      user.organization = await organizationsService.show(organizationId)
      user.thumbnail = user.thumbnail_id ? await thumbnailService.show(user.thumbnail_id) : null
      await getRoleAndPermission({ user, userId: user_id, organizationId })
      return success(user)
    }

    return error('DATA_NOT_FOUND')
  } catch (e) {
    return error(e.detail || e.message, 500)
  }
}

export const update: APIGatewayProxyHandler = async (event: APIGatewayCustomProxyEvent, {}) => {
  const { body, requestContext: { authorizer: { user } }, pathParameters: { user_id } } = event
  const userParse = JSON.parse(user)
  const bodyParse = JSON.parse(body)
  const { organization_id, id: currentUserId } = userParse
  const userId: number = parseInt(user_id, 10)
  let { thumbnail, role_name, ...userData } = bodyParse
  const { role_id, permissions = [] } = userData
  const { email, password } = userData
  const newRole = !!role_id ? role_id === CREATE_NEW_ROLE : false

  const validate = updateRequest.validate(userData)
  if (validate.length) {
    return errorValidate(validate)
  }

  try {
    const users = await userService.show(userId)

    if (users) {
      const emailExists = await userService.checkEmailExists({ email, id: user_id })
      if (emailExists) {
        return error('Email already exists', 422)
      }

      if (role_id && role_id !== CREATE_NEW_ROLE) {
        const role = await roleService.show(role_id)
        if (!role) {
          return error('Role not exists', 422)
        }
      }

      if (newRole) {
        if (!role_name) {
          return error('Role name is required', 422)
        }
        userData.role_id = await createNewRole(bodyParse, userParse)
      }

      if (thumbnail) {
        const { id, path, name, original_path, size = '300x300', format = 'image/JGP' } = thumbnail
        const thumbnailData = { path, original_path, size, format, name }
        userData.thumbnail_id = await thumbnailService.update(id, thumbnailData)
      }

      Object.assign(userData, { updated_by: currentUserId })
      if (password) {
        const hashPassword = bcrypt.hashSync(password, SALTROUNDS)
        Object.assign(userData, { password: hashPassword })
      }

      const updated = await userService.update(userId, userData)

      if (permissions.length || role_id !== null) {
        const dataUpdate = { user_id, role_id: userData.role_id, permissions, organization_id, newRole }
        await attachRolePermission(dataUpdate)
      }

      const dataSummary = {
        create_by: currentUserId,
        organization_id,
      }
      const usersCount = await summaryService.countUserActive(dataSummary)
      await ioTServices.publishData({ topic: `organization/${organization_id}/summary`, users: usersCount })

      if (updated) {
        return success(bodyParse)
      }

      return error('SOMETHING_WENT_WRONG', 500)
    }

    return error('DATA_NOT_FOUND')
  } catch (e) {
    return error(e.detail || e.message, 500)
  }
}

export const destroy: APIGatewayProxyHandler = async (event: APIGatewayCustomProxyEvent) => {
  const { multiValueQueryStringParameters: { ids = '' } = {}, requestContext: { authorizer: { user } } } = event
  const auth = JSON.parse(user)
  const { id: currentUserId, organization_id } = auth
  const listIds: string = ids[0]

  try {
    const idsParse = listIds.split(',')
    const idDelete = idsParse.filter(id => id !== currentUserId)
    const deleted = await userService.delete(idDelete)

    if (deleted) {
      const dataSummary = {
        create_by: currentUserId,
        organization_id,
      }
      const usersCount = await summaryService.countUserActive(dataSummary)
      await ioTServices.publishData({ topic: `organization/${organization_id}/summary`, users: usersCount })

      return success('DELETE_SUCCEED')
    }

    return error('SOMETHING_WENT_WRONG')
  } catch (e) {
    return error(e.message || e.detail, 500)
  }
}

export async function attachRolePermission(data) {
  const { user_id, role_id, permissions, organization_id, newRole } = data
  await roleService.attachUserRole({ user_id, role_id })
  await organizationsService.attachOrganization({ user_id, organization_id })
  if (newRole) {
    await roleService.attachPermission({ permissions, role_id })
  } else {
    const allPermission = await permissionService.getAllPermissionByRole(role_id)
    const permissionOfRole = allPermission.map((data) => data.name)
    const permissionUser = _.difference(permissions, permissionOfRole)
    await permissionService.attachUserPermission({ user_id, permissions: permissionUser })
  }
}

export async function createNewRole(data: any, user: any): Promise<InsertResult> {
  const { role_name } = data
  const { id, organization_id } = user
  const dataRole = {
    name: role_name,
    created_by_user: id,
    organization_id,
    display_name: role_name,
    description: role_name,
  }
  const role = await roleService.store(dataRole)
  return role.identifiers[0].id
}

export const seederData: APIGatewayProxyHandler = async ({}, {}) => {
  console.log('seederData')
  try {
    await userService.store(SYS_USER)
    await organizationsService.storeSetting(ORGANIZATION_SETTING_SEEDER)
    await organizationsService.store(ORGANIZATION_DEFAULT)
    await organizationsService.attachOrganization(ORGANIZATION_USER_DEFAULT)
    await permissionService.store(PERMISSIONS)
    await roleService.store(ROLE_DEFAULT)
    await roleService.attachUserRole(USER_ROLE_DEFAULT)
    await roleService.createRolePermissionDefaultByRoleId(1, PERMISSION_SYSADMIN_DEFAULT)
    await roleService.createRolePermissionDefaultByRoleId(2, PERMISSION_DISTRIBUTOR_DEFAULT)
    await roleService.createRolePermissionDefaultByRoleId(3, PERMISSION_CUSTOMER_DEFAULT)

    return success('SUCCESS')
  } catch (e) {
    return error(e.message || e.detail, 500)
  }
}

export const getUserDetailForNotifications: APIGatewayProxyHandler = async (event: APIGatewayCustomProxyEvent, {}) => {
  const { pathParameters: { user_id } } = event

  try {
    const user = await userService.show(user_id)

    if (user) {
      user.thumbnail = user.thumbnail_id ? await thumbnailService.show(user.thumbnail_id) : null
      return success(user)
    }

    return error('DATA_NOT_FOUND')
  } catch (e) {
    return error(e.detail || e.message, 500)
  }
}

export const getAllUserDataOfOrganization: APIGatewayProxyHandler = async (event: APIGatewayCustomProxyEvent) => {
  const { pathParameters: { organization_id } } = event

  try {
    const user = await userService.getAllUserDataOfOrganization(parseInt(organization_id, 10))

    return success(user)
  } catch (e) {
    return error(e.detail || e.message, 500)
  }
}
