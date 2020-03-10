import { APIGatewayProxyHandler } from 'aws-lambda'
import moment from 'moment'
import bcrypt from 'bcryptjs'
import format from 'string-format'
import parserUserAgent from 'ua-parser-js'

import { LambdaResponseTrait } from '@alpha/alpha-framework/dist/Traits'
import { APIGatewayCustomProxyEvent } from '../../../../infrastructure/Type'

import AuthService from '../Services/AuthService'
import getRoleAndPermission from '../../Users/Utils'
import { SALTROUNDS, THUMBNAIL_DEFAULT } from '../../../../infrastructure/constanst'
import ThumbnailsService from '../../Thumbnails/Services/ThumbnailsService'
import UserService from '../../Users/Services/UserService'
import PasswordResetService from '../../Users/Services/PasswordResetService'
import SESServices from '../../../../infrastructure/Services/SESServices'
import { resetPasswordSuccess, resetPasswordTemplate } from '../../../../templates/emails'

const { success, error } = LambdaResponseTrait
const authService = new AuthService()
const thumbnailService = new ThumbnailsService()
const userService = new UserService()
const passwordResetService = new PasswordResetService()
const sesService = new SESServices()

export const login: APIGatewayProxyHandler = async (event) => {
  try {
    return await authService.login(event)
  } catch (e) {
    console.log(e)
    return error(e.detail || e.message, 403)
  }
}

export const logout: APIGatewayProxyHandler = async (event: APIGatewayCustomProxyEvent) => {
  const { headers: { Authorization } } = event

  try {
    const tokenParts = Authorization.split(' ')
    const token = tokenParts[1]
    const result = await authService.logout(token)

    if (result) {
      return success('LOGOUT_SUCCESS')
    }
    return error('SOMETHING_WENT_WRONG', 500)
  } catch (e) {
    return error(e.detail || e.message, 500)
  }
}

export const refreshToken: APIGatewayProxyHandler = async (event: APIGatewayCustomProxyEvent) => {
  try {
    const { requestContext: { authorizer: { user } } } = event
    const userParse = JSON.parse(user)

    return AuthService.refreshToken(userParse)
  } catch (e) {
    return error(e.detail || e.message, 500)
  }
}

export const profile: APIGatewayProxyHandler = async (event: APIGatewayCustomProxyEvent) => {
  const { requestContext: { authorizer: { user } } } = event
  const userParse = JSON.parse(user)
  const { id: userId, organization_id: organizationId } = userParse

  try {
    await getRoleAndPermission({ user: userParse, userId, organizationId })
    const { thumbnail_id } = userParse
    userParse.thumbnail = thumbnail_id ? await thumbnailService.show(thumbnail_id) : THUMBNAIL_DEFAULT

    return success(userParse)
  } catch (e) {
    return error(e.detail || e.message, 500)
  }
}

export const forgotPassword: APIGatewayProxyHandler = async (event: APIGatewayCustomProxyEvent) => {
  const { pathParameters: { email }, headers: { origin, ...headers } } = event

  try {
    const user = await userService.checkEmailExists({ email })
    const token = bcrypt.hashSync('token', SALTROUNDS)

    if (user) {
      const dataInsert = {
        token,
        email,
        expired_at: moment().add(2, 'minutes').format('YYYY-MM-DD HH:mm:ss')
      }
      await passwordResetService.delete(email)
      const inserted = await passwordResetService.store(dataInsert)

      if (inserted) {
        const url = `${ origin }/reset-password?email=${ email }&token=${ token }`
        const userAgent = parserUserAgent(headers['User-Agent'])
        const { browser: { name: browser_name }, os: { name: os_name } } = userAgent
        const htmlBody = format(resetPasswordTemplate, user.first_name, user.last_name, url, os_name, browser_name)
        const data = { email, htmlBody }
        await sesService.sendEmail(data)
      }

      return success('Send email success')
    }

    return error('Can\'t find that email, sorry.', 400)
  } catch (e) {
    return error(e.detail || e.message, 500)
  }
}

export const checkTokenResetPassword: APIGatewayProxyHandler = async (event: APIGatewayCustomProxyEvent) => {
  const { email = '', token = '' } = event.queryStringParameters || {}

  try {
    const data = await passwordResetService.checkTokenResetPassword({ email, token })
    if (data) {
      return success('OK')
    }

    return error('Token expired or email does not exists', 400)
  } catch (e) {
    return error(e.detail || e.message, 500)
  }
}

export const resetPassword: APIGatewayProxyHandler = async (event: APIGatewayCustomProxyEvent) => {
  const { body, headers } = event
  const { email, password, token } = JSON.parse(body)

  try {
    const validateToken = await passwordResetService.checkTokenResetPassword({ email, token })

    if (!validateToken) {
      return error('Token expired or email does not exists', 400)
    }

    const user = await userService.checkEmailExists({ email })

    if (user) {
      const dataUpdate = {
        password: bcrypt.hashSync(password, SALTROUNDS)
      }

      const updated = await userService.update(user.id, dataUpdate)

      if (updated) {
        await passwordResetService.delete(email)
        const userAgent = parserUserAgent(headers['User-Agent'])
        const { browser: { name: browser_name }, os: { name: os_name } } = userAgent
        const htmlBody = format(resetPasswordSuccess, user.first_name, user.last_name, os_name, browser_name)
        const data = {
          email,
          htmlBody,
          subject: 'Confirm change password'
        }
        await sesService.sendEmail(data)
        return success('Reset password successful')
      }

      return error('SOMETHING_WENT_WRONG', 500)
    }
  } catch (e) {
    return error(e.detail || e.message, 500)
  }
}
