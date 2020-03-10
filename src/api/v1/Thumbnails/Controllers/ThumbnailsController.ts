import { APIGatewayProxyHandler } from 'aws-lambda'
import { LambdaResponseTrait } from '@alpha/alpha-framework/dist/Traits'
import { getDataJson, parsePaginate } from '../../../../infrastructure/Helpers'
import ThumbnailsService from '../Services/ThumbnailsService'

const { success, error } = LambdaResponseTrait
const thumbnailsService = new ThumbnailsService()

export const list: APIGatewayProxyHandler = async (event, {}) => {
  try {
    const { page = '1', keyword = '' } = event.queryStringParameters || {}
    const options = {
      page: parseInt(page, 10) > 0 ? page : 1,
      keyword
    }

    const data = await thumbnailsService.find(options)
    const result = parsePaginate(data, page)

    return success(result)
  } catch (e) {
    return error(e.detail || e.message, 500)
  }
}

export const create: APIGatewayProxyHandler = async (event, {}) => {
  const { body } = event
  const bodyParse = getDataJson(body)

  try {
    const data = await thumbnailsService.store(bodyParse)
    return success(data)
  } catch (e) {
    return error(e.detail || e.message, 500)
  }
}

export const show: APIGatewayProxyHandler = async (event, {}) => {
  const { pathParameters: { thumbnail_id } } = event

  try {
    const thumbnailId = parseInt(thumbnail_id, 10)
    const thumbnail = await thumbnailsService.show(thumbnailId)

    if (thumbnail) {
      return success(thumbnail)
    }

    return error('DATA_NOT_FOUND')
  } catch (e) {
    return error(e.detail || e.message, 500)
  }
}

export const update: APIGatewayProxyHandler = async (event, {}) => {
  const { body, pathParameters: { thumbnail_id } } = event
  const data = await thumbnailsService.show(thumbnail_id)

  if (data) {
    const bodyParse = getDataJson(body)
    const updated = await thumbnailsService.update(thumbnail_id, bodyParse)

    if (updated) {
      return success(bodyParse)
    }

    return error('SOMETHING_WENT_WRONG', 500)
  }

  return error('THUMBNAIL_NOT_FOUND')
}

export const destroy: APIGatewayProxyHandler = async (event, {}) => {
  const { multiValueQueryStringParameters: { ids = '' } = {} } = event
  const listIds: string = ids[0]

  try {
    const idsParse = listIds.split(',')
    const deleted = await thumbnailsService.delete(idsParse)

    if (deleted) {
      return success('DELETE_SUCCEED')
    }

    return error('SOMETHING_WENT_WRONG', 500)
  } catch (e) {
    return error(e.detail || e.message, 500)
  }
}
