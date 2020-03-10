import { DeleteResult, EntityRepository } from 'typeorm'

import BaseRepository from '../../../../infrastructure/Repositories'
import RolePermission from '../Entities/RolePermission'

@EntityRepository(RolePermission)
class RolePermissionRepository extends BaseRepository<RolePermission> {

  constructor() {
    super(RolePermission, 'role_permission')
  }

  public async checkRolePermissionExists(roleId: number, permissionId: number): Promise<RolePermission> {
    const connection = await this.db.getConnection()

    return await connection
      .getRepository(RolePermission)
      .createQueryBuilder('role_permission')
      .where('role_id = :role_id', {role_id: roleId})
      .andWhere('permission_id = :permission_id', {permission_id: permissionId})
      .getOne()
  }

  public async destroyAllRole(roleId: number): Promise<DeleteResult> {
    const connection = await this.db.getConnection()

    return connection
      .getRepository(RolePermission)
      .createQueryBuilder()
      .delete()
      .where('role_id = :roleId', {roleId})
      .execute()
  }
}

export default RolePermissionRepository
