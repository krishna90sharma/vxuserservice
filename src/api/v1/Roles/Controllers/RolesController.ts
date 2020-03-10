import { APIGatewayProxyHandler } from 'aws-lambda'
import { LambdaResponseTrait } from '@alpha/alpha-framework/dist/Traits'
import { parsePaginate } from '../../../../infrastructure/Helpers'
import RolesService from '../Services/RolesService'
import PermissionsService from '../../Permissions/Services/PermissionsService'
import { APIGatewayCustomProxyEvent } from '../../../../infrastructure/Type'
import Roles from '../Entities/Roles'
import { UserService } from '../../Users/Services'

const {success, error} = LambdaResponseTrait
const roleService = new RolesService()
const permissionService = new PermissionsService()
const userService = new UserService()

export const list: APIGatewayProxyHandler = async (event: APIGatewayCustomProxyEvent, {}) => {
  try {
    const {requestContext: {authorizer: {user}}} = event
    const userParse = JSON.parse(user)
    const {page = '1', keyword = ''} = event.queryStringParameters || {}
    const options = {
      page: parseInt(page, 10) > 0 ? page : 1,
      keyword,
      organization_id: userParse.organization_id
    }

    const data = await roleService.find(options)

    const listPermissions = await data[0].map(async (role: Roles) => {
      let user_create = ''
      const permissions = await permissionService.getAllPermissionByRole(role.id)
      const total_users = await userService.getCountUserByRoleAndOrganization(role.id, role.organization_id)
      if (role.created_by_user) {
        const user = await userService.show(role.created_by_user)
        user_create = user && `${user.last_name} ${user.first_name}`
      }

      role.total_users = total_users
      role.user_create = user_create
      role.permissions = permissions.map((permission) => permission.name)

      return role
    })

    data[0] = await Promise.all(listPermissions)

    const result = parsePaginate(data, page)

    return success(result)
  } catch (e) {
    return error(e.detail || e.message, 500)
  }
}

export const create: APIGatewayProxyHandler = async (event, {}) => {
  const {body} = event
  const bodyParse = JSON.parse(body)
  const {permissions} = bodyParse

  try {
    const role = await roleService.store(bodyParse)
    const roleId = role.identifiers[0].id

    if (permissions && roleId) {
      const permission = await roleService.attachPermission({role_id: roleId, permissions})
      console.log(permission)
    }
    return success(bodyParse)
  } catch (e) {
    return error(e.detail || e.message, 500)
  }
}

export const show: APIGatewayProxyHandler = async (event, {}) => {
  const {pathParameters: {role_id}} = event

  try {
    const roleId = parseInt(role_id, 10)
    const role = await roleService.show(roleId)
    if (role) {
      const permissions = await permissionService.getAllPermissionByRole(roleId)
      role.permissions = permissions && permissions.map((permission) => permission.name) || []

      return success(role)
    }

    return error('DATA_NOT_FOUND')
  } catch (e) {
    return error(e.detail || e.message, 500)
  }
}

export const update: APIGatewayProxyHandler = async (event, {}) => {
  const {body, pathParameters: {role_id}} = event
  try {
    const role = await roleService.show(role_id)

    if (role) {
      const bodyParse = JSON.parse(body)
      const {permissions} = bodyParse
      const updated = await roleService.update(role_id, bodyParse)
      if (permissions) {
        const updatePermission = await roleService.updatePermission({role_id, permissions})
        if (!updatePermission) {
          return error('UPDATE_PERMISSION_ERROR', 500)
        }
      }

      if (updated) {
        return success(bodyParse)
      }

      return error('SOMETHING_WENT_WRONG', 500)
    }

    return error('ROLE_NOT_FOUND')
  } catch (e) {
    return error(e.detail || e.message, 500)
  }
}

export const destroy: APIGatewayProxyHandler = async (event, {}) => {
  const {multiValueQueryStringParameters: {ids = ''} = {}} = event
  const listIds: string = ids[0]

  try {
    const idsParse = listIds.split(',')
    const deleted = await roleService.delete(idsParse)

    if (deleted) {
      return success('DELETE_SUCCEED')
    }

    return error('SOMETHING_WENT_WRONG', 500)
  } catch (e) {
    return error(e.detail || e.message, 500)
  }
}
