import { InsertResult } from 'typeorm'
import _ from 'lodash'

import PermissionsRepository from '../Repositories/PermissionsRepository'
import RolePermissionRepository from '../Repositories/RolePermissionRepository'
import UserPermissionRepository from '../Repositories/UserPermissionRepository'
import Permissions from '../Entities/Permissions'
import { UserRepository } from '../../Users/Repositories'
import { PERMISSIONS } from '../../../../infrastructure/constanst'

class PermissionsService {
  protected permissionsRepository: PermissionsRepository
  protected rolePermissionRepository: RolePermissionRepository
  protected userPermissionRepository: UserPermissionRepository
  protected userRepository: UserRepository

  constructor() {
    this.permissionsRepository = new PermissionsRepository()
    this.rolePermissionRepository = new RolePermissionRepository()
    this.userPermissionRepository = new UserPermissionRepository()
    this.userRepository = new UserRepository()
  }

  public async find(options): Promise<[Permissions[], number]> {
    return await this.permissionsRepository.getAll(options)
  }

  public async getAllPermissionByRole(roleId: number): Promise<Permissions[]> {
    return await this.permissionsRepository.getAllPermissionByRole(roleId)
  }

  public async getAllPermissionByRoleIds(roleId: number[]): Promise<Permissions[]> {
    return await this.permissionsRepository.getAllPermissionByRoleIds(roleId)
  }

  public async getAllPermissionByUser(userId: any): Promise<Permissions[]> {
    return await this.permissionsRepository.getAllPermissionByUser(userId)
  }

  public async show(id): Promise<Permissions> {
    return await this.permissionsRepository.show(id)
  }

  public async store(data): Promise<InsertResult> {
    return await this.permissionsRepository.store(data)
  }

  public async update(id, data): Promise<any> {
    return await this.permissionsRepository.updateDataById(id, data)
  }

  public async delete(ids): Promise<any> {
    return await this.permissionsRepository.deleteDataWithIds(ids)
  }

  public async attachUserPermission(data: any): Promise<any> {
    const {user_id, permissions} = data

    const permissionData = permissions.map((item) => _.find(PERMISSIONS, (permission) => permission.name === item))
    if (permissionData.length) {
      await this.userPermissionRepository.destroyBy({key: 'user_id', value: user_id})
      const userPermission = permissionData.map((permission) => ({
        user_id,
        permission_id: permission.id
      }))

      await this.userPermissionRepository.store(userPermission)
    }
  }

  public async attachMultiPermission(data: any): Promise<any> {
    const {user_id, permissions} = data
    const attached = []

    permissions.map(async (permissionName) => {
      const permission = await this.permissionsRepository.findBy({key: 'name', value: permissionName})
      if (permission) {
        if (user_id) {
          const user = await this.userRepository.show(user_id)
          if (user) {
            const checkUserPermission = await this.userPermissionRepository.checkPermissionExistsByUserId(permission.id, user_id)
            if (!checkUserPermission) {
              const stored = await this.userPermissionRepository.store({user_id, permission_id: permission.id})

              return attached.push(stored)
            }
          }
        }
      }
    })

    return await Promise.all(attached)
  }

  public async detachMultiPermission(data: any): Promise<any> {
    const {user_id, permissions} = data
    const detached = []

    permissions.map(async (permissionId) => {
      const checkPermission = await this.permissionsRepository.show(permissionId)
      if (checkPermission) {
        if (user_id) {
          const user = await this.userRepository.show(user_id)
          if (user) {
            const userPermission = await this.userPermissionRepository.checkPermissionExistsByUserId(permissionId, user_id)
            if (userPermission) {
              const stored = await this.userPermissionRepository.destroyById(userPermission.id)

              return detached.push(stored)
            }
          }
        }
      }
    })

    return await Promise.all(detached)
  }

  public async seederPermission(permissions: object): Promise<InsertResult> {
    return await this.permissionsRepository.seederPermission(permissions)
  }
}

export default PermissionsService
