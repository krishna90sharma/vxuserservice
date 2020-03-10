import { APIGatewayProxyHandler } from 'aws-lambda'
import 'source-map-support/register'
import { LambdaResponseTrait } from '@alpha/alpha-framework/dist/Traits'
import { THUMBNAILS } from '../../../../infrastructure/constanst/seeder'
import ThumbnailsService from '../../Thumbnails/Services/ThumbnailsService'

const { success, error } = LambdaResponseTrait
const thumbnailService = new ThumbnailsService()

export const thumbnails: APIGatewayProxyHandler = async () => {
  try {
    const thumbnails = await thumbnailService.store(THUMBNAILS)
    return success(thumbnails)
  } catch (e) {
    return error(e.detail || e.message, 500)
  }
}
