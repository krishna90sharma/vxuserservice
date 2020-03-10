import { EntityRepository } from 'typeorm'

import UserRole from '../Entities/UserRole'
import BaseRepository from '../../../../infrastructure/Repositories'
import Roles from '../Entities/Roles'
import RolesRepository from './RolesRepository'

@EntityRepository(UserRole)
class UserRoleRepository extends BaseRepository<UserRole> {

  constructor() {
    super(UserRole, 'user_role')
  }

  public async checkRoleExistsByUserId(roleId: number, userId: number): Promise<UserRole> {
    const connection = await this.db.getConnection()

    return await connection
      .getCustomRepository(UserRoleRepository)
      .createQueryBuilder('user_role')
      .where('user_id = :user_id', {user_id: userId})
      .andWhere('role_id = :role_id', {role_id: roleId})
      .getOne()
  }

  public async findRoleByUser(userId: number): Promise<Roles[]> {
    const connection = await this.db.getConnection()

    return await connection
      .getCustomRepository(RolesRepository)
      .createQueryBuilder('roles')
      .innerJoin(UserRole, 'user_role', 'user_role.role_id = roles.id')
      .where('user_role.user_id = :user_id', {user_id: userId})
      .getMany()
  }

  public async findRoleByUserAndOrganization(userId: number, organizationId: number): Promise<Roles> {
    const connection = await this.db.getConnection()

    return await connection
      .getCustomRepository(RolesRepository)
      .createQueryBuilder('roles')
      .innerJoin(UserRole, 'user_role', 'user_role.role_id = roles.id')
      .where('user_role.user_id = :userId', {userId})
      .andWhere('roles.organization_id = :organizationId', {organizationId})
      .getOne()
  }
}

export default UserRoleRepository
