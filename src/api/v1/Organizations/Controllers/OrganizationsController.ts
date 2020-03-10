import { APIGatewayProxyHandler } from 'aws-lambda'
import { LambdaResponseTrait } from '@alpha/alpha-framework/dist/Traits'
import { parsePaginate } from '../../../../infrastructure/Helpers'
import OrganizationsService from '../Services/OrganizationsService'
import { UserService } from '../../Users/Services'
import ThumbnailsService from '../../Thumbnails/Services/ThumbnailsService'
import { APIGatewayCustomProxyEvent } from '../../../../infrastructure/Type'
import { ORGANIZATION_SETTING_DEFAULT, THUMBNAIL_DEFAULT } from '../../../../infrastructure/constanst'
import { ORGANIZATION_SETTING_SEEDER } from '../../../../infrastructure/constanst/seeder'
import DistributorsService from '../../Distributors/Services/DistributorsService'

const { success, error } = LambdaResponseTrait
const organizationsService = new OrganizationsService()
const userService = new UserService()
const thumbnailService = new ThumbnailsService()
const distributorService = new DistributorsService()

export const list: APIGatewayProxyHandler = async (event, {}) => {
  try {
    const { page = '1', keyword = '' } = event.queryStringParameters || {}
    const options = {
      page: parseInt(page, 10) > 0 ? page : 1,
      keyword
    }

    const data = await organizationsService.find(options)
    const result = parsePaginate(data, page)

    return success(result)
  } catch (e) {
    return error(e.detail || e.message, 500)
  }
}

export const create: APIGatewayProxyHandler = async (event: APIGatewayCustomProxyEvent) => {
  const { body, requestContext: { authorizer: { user } } } = event
  const bodyParse = JSON.parse(body)
  const auth = JSON.parse(user)
  const { thumbnail, ...organization } = bodyParse
  const { id: currentUserId } = auth

  try {
    if (thumbnail) {
      const newThumbnail = await thumbnailService.store(thumbnail)
      organization.thumbnail_id = newThumbnail.identifiers[0].id
    }
    const setting = await organizationsService.storeSetting(ORGANIZATION_SETTING_SEEDER)
    organization.setting_id = setting.identifiers[0].id
    organization.create_by = currentUserId
    organization.updated_by = currentUserId

    const data = await organizationsService.store(organization)

    return success(data)
  } catch (e) {
    return error(e.detail || e.message, 500)
  }
}

export const show: APIGatewayProxyHandler = async (event, {}) => {
  const { pathParameters: { organization_id } } = event

  try {
    const organizationId = parseInt(organization_id, 10)
    if (organizationId) {
      const organization = await organizationsService.show(organizationId)

      if (organization) {
        organization.owner = await userService.getOwnerOfOrganization(organizationId)

        return success(organization)
      }
    }

    return error('DATA_NOT_FOUND')
  } catch (e) {
    console.log(e)
    return error(e.detail || e.message, 500)
  }
}

export const listUser: APIGatewayProxyHandler = async (event, {}) => {
  const { pathParameters: { organization_id } } = event
  const { page = '1', keyword = '' } = event.queryStringParameters || {}
  const options = {
    page: parseInt(page, 10) > 0 ? page : 1,
    keyword
  }

  try {
    const organizationId = parseInt(organization_id, 10)
    const users = await userService.getUserByOrganization(organizationId, options)

    if (users) {
      const result = parsePaginate(users, page)

      return success(result)
    }

    return error('DATA_NOT_FOUND')
  } catch (e) {
    return error(e.detail || e.message, 500)
  }
}

export const listDistributorCustomer: APIGatewayProxyHandler = async (event: APIGatewayCustomProxyEvent, {}) => {
  const { keyword = '' } = event.queryStringParameters || {}
  const { requestContext: { authorizer: { user } } } = event
  const userParse = JSON.parse(user)
  const { organization_id, id: user_id } = userParse
  const options = {
    keyword,
    create_by: user_id,
    organization_id
  }

  try {
    const users = await distributorService.findUserForAssignDevice(options)

    return success(users)
  } catch (e) {
    return error(e.message || e.detail, 500)
  }
}

export const myOrganization: APIGatewayProxyHandler = async (event: APIGatewayCustomProxyEvent, {}) => {
  const { requestContext: { authorizer: { user } } } = event
  const userParse = JSON.parse(user)
  const { organization_id } = userParse

  try {
    const organization = await organizationsService.show(organization_id)
    if (organization) {
      organization.setting = organization.setting || ORGANIZATION_SETTING_DEFAULT
      organization.thumbnail = organization.thumbnail || THUMBNAIL_DEFAULT

      return success(organization)
    }

    return error('DATA_NOT_FOUND')
  } catch (e) {
    return error(e.detail || e.message, 500)
  }
}

export const update: APIGatewayProxyHandler = async (event: APIGatewayCustomProxyEvent) => {
  const { body, pathParameters: { organization_id }, requestContext: { authorizer: { user } } } = event
  const bodyParse = JSON.parse(body)
  const auth = JSON.parse(user)
  const { id: currentUserId } = auth
  const { thumbnail, ...organization } = bodyParse

  const data = await organizationsService.show(organization_id)
  try {
    if (data) {
      if (thumbnail) {
        const { id, ...thumbnailData } = thumbnail

        organization.thumbnail_id = await thumbnailService.update(id, thumbnailData)
      }

      organization.updated_by = currentUserId
      const updated = await organizationsService.update(organization_id, organization)

      if (updated) {
        return success(bodyParse)
      }

      return error('SOMETHING_WENT_WRONG', 500)
    }
    return error('ORGANIZATION_NOT_FOUND')
  } catch (e) {
    return error(e.detail || e.message, 500)
  }
}

export const destroy: APIGatewayProxyHandler = async (event, {}) => {
  const { multiValueQueryStringParameters: { ids = '' } = {} } = event
  const listIds: string = ids[0]

  try {
    const idsParse = listIds.split(',')
    const deleted = await organizationsService.delete(idsParse)

    if (deleted) {
      return success('DELETE_SUCCEED')
    }

    return error('SOMETHING_WENT_WRONG', 500)
  } catch (e) {
    return error(e.detail || e.message, 500)
  }
}

/*
* Get organization detail by user id for invoke lambda
* */
export const getOrganizationByUserId: APIGatewayProxyHandler = async (event, {}) => {
  const { pathParameters: { user_id, type = null } } = event

  try {
    const userId = parseInt(user_id, 10)
    const organization = await organizationsService.getOrganizationByUserId(userId, type)

    return success(organization)
  } catch (e) {
    return error(e.detail || e.message, 500)
  }
}

export const getAllWithKeyword: APIGatewayProxyHandler = async (event: APIGatewayCustomProxyEvent) => {
  const { keyword = '' } = event.queryStringParameters || {}

  try {
    if (!keyword) {
      return success([])
    }

    const data = await organizationsService.getAllWithKeyword({ keyword })

    return success(data)
  } catch (e) {
    return error(e.detail || e.message, 500)
  }
}