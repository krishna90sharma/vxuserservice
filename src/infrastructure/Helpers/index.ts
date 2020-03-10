import { PER_PAGE } from '../constanst'
import { APIGatewayProxyResult } from 'aws-lambda'
import { LambdaResponseTrait } from '@alpha/alpha-framework/dist/Traits'

const { error } = LambdaResponseTrait

export function parsePaginate(data: any, page: string): object {
  return {
    current_page: parseInt(page, 10),
    data: data[0] || [],
    from: PER_PAGE * (parseInt(page, 10) - 1),
    last_page: (data[1] && Math.ceil(data[1] / PER_PAGE)) || 1,
    per_page: PER_PAGE,
    total: data[1] || 0,
  }
}

export function errorValidate(errors): APIGatewayProxyResult {
  const message = errors.map((error) => error.message)

  return error(message, 422)
}

export function getDataJson(data) {
  try {
    JSON.parse(JSON.stringify(data))
  } catch (e) {
    return data
  }

  return JSON.parse(JSON.stringify(data))
}
