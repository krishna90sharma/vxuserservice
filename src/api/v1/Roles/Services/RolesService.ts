import _ from 'lodash'
import RolesRepository from '../Repositories/RolesRepository'
import UserRoleRepository from '../Repositories/UserRoleRepository'
import Roles from '../Entities/Roles'
import PermissionsRepository from '../../Permissions/Repositories/PermissionsRepository'
import RolePermissionRepository from '../../Permissions/Repositories/RolePermissionRepository'
import { InsertResult } from 'typeorm'
import { PERMISSIONS } from '../../../../infrastructure/constanst'

class RolesService {
  protected rolesRepository: RolesRepository
  protected userRoleRepository: UserRoleRepository
  protected permissionRepository: PermissionsRepository
  protected rolePermissionRepository: RolePermissionRepository

  constructor() {
    this.rolesRepository = new RolesRepository()
    this.userRoleRepository = new UserRoleRepository()
    this.permissionRepository = new PermissionsRepository()
    this.rolePermissionRepository = new RolePermissionRepository()
  }

  public async find(options): Promise<[Roles[], number]> {
    return await this.rolesRepository.getAll(options)
  }

  public async show(id): Promise<Roles> {
    return await this.rolesRepository.show(id)
  }

  public async store(data): Promise<InsertResult> {
    return await this.rolesRepository.store(data)
  }

  public async update(id, data): Promise<any> {
    return await this.rolesRepository.updateDataById(id, data)
  }

  public async delete(ids): Promise<any> {
    return await this.rolesRepository.deleteDataWithIds(ids)
  }

  public async attachUserRole(data): Promise<any> {
    const { user_id, role_id } = data
    await this.userRoleRepository.destroyBy({ key: 'user_id', value: user_id })
    if (role_id) {
      return await this.userRoleRepository.store(data)
    }
  }

  public async attachPermission(data): Promise<any> {
    const { permissions, role_id } = data

    const permissionData = _.compact(permissions.map((item) => _.find(PERMISSIONS, (permission) => permission.name === item)))
    if (permissionData.length) {
      await this.rolePermissionRepository.destroyAllRole(role_id)
      const rolePermission = permissionData.map((permission) => ({
        role_id,
        permission_id: permission.id
      }))

      return await this.rolePermissionRepository.store(rolePermission)
    }
  }

  public async attachPermissionDefault(data): Promise<InsertResult> {
    const { permissions, role_id } = data
    const rolePermissionDefault = permissions.map((permission_id) => ({
      role_id,
      permission_id
    }))
    console.log(rolePermissionDefault, 'rolePermissionDefault')
    return await this.rolePermissionRepository.store(rolePermissionDefault)
  }

  public async detachRole(data): Promise<any> {
    const { user_id, role_id } = data
    const userRole = await this.userRoleRepository.checkRoleExistsByUserId(role_id, user_id)

    if (userRole) {
      return await this.userRoleRepository.destroyById(userRole.id)
    }

    return false
  }

  public async findRoleByUser(userId: any): Promise<Roles[]> {
    return await this.userRoleRepository.findRoleByUser(userId)
  }

  public async findRoleByUserAndOrganization(userId: number, organizationId: number): Promise<Roles> {
    return await this.userRoleRepository.findRoleByUserAndOrganization(userId, organizationId)
  }

  public async updatePermission(data: any): Promise<any> {
    const { role_id } = data
    await this.rolePermissionRepository.destroyAllRole(role_id)
    return await this.attachPermission(data)
  }

  public async createRolePermissionDefaultByRoleId(roleId: number, permissions: number[]): Promise<InsertResult> {
    const permission = permissions.map((permissionId) => ({
      role_id: roleId,
      permission_id: permissionId
    }))

    console.log(permission, 'permission')
    await this.rolePermissionRepository.destroyAllRole(roleId)
    return await this.rolePermissionRepository.store(permission)
  }
}

export default RolesService
