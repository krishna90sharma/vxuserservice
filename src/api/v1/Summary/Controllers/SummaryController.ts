import { APIGatewayProxyHandler } from 'aws-lambda'
import { LambdaResponseTrait } from '@alpha/alpha-framework/dist/Traits'

import SummaryService from '../Services/SummaryService'
import { APIGatewayCustomProxyEvent } from '../../../../infrastructure/Type'

const { success, error } = LambdaResponseTrait
const summaryService = new SummaryService()

export const index: APIGatewayProxyHandler = async (event: APIGatewayCustomProxyEvent, {}) => {
  const { requestContext: { authorizer: { user } } } = event
  const userParse = JSON.parse(user)
  const { organization_id, id } = userParse

  const data = {
    organization_id,
    create_by: id,
    user
  }

  try {
    const response = await summaryService.getSummary(data)

    return success(response)
  } catch (e) {
    return error(e.detail || e.message, 500)
  }
}
