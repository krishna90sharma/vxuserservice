import _ from 'lodash'
import PermissionsService from '../../Permissions/Services/PermissionsService'
import RolesService from '../../Roles/Services/RolesService'

export default async function getRoleAndPermission(data) {
  const { user, userId, organizationId } = data
  const permissionService = new PermissionsService()
  const roleService = new RolesService()
  const role = await roleService.findRoleByUserAndOrganization(userId, organizationId)
  if (role) {
    const permissionUser = await permissionService.getAllPermissionByUser(userId)
    const permissionRoles = await permissionService.getAllPermissionByRole(role.id)
    const permissions = _.unionBy(permissionRoles, permissionUser, 'id')
    user.role = role
    user.permissions = (permissions.length) ? permissions.map((role) => role.name) : []
  }

  return user
}
