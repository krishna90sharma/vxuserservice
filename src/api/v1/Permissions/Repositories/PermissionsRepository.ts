import { Brackets, EntityRepository, InsertResult } from 'typeorm'

import { PER_PAGE } from '../../../../infrastructure/constanst'
import Permissions from '../Entities/Permissions'
import BaseRepository from '../../../../infrastructure/Repositories'

@EntityRepository(Permissions)
class PermissionsRepository extends BaseRepository<Permissions> {

  constructor() {
    super(Permissions, 'permissions')
  }

  public async getAll(options): Promise<[Permissions[], number]> {
    const {page, keyword} = options
    const perPage = PER_PAGE
    const start = perPage * (page - 1)
    const connection = await this.db.getConnection()
    let query = connection
      .getCustomRepository(PermissionsRepository)
      .createQueryBuilder('roles')
      .where('deleted_at IS NULL')

    if (keyword !== '') {
      query = query.andWhere(new Brackets(subQuery => {
        subQuery.where('name ilike :keyword', { keyword: '%' + keyword + '%' })
          .orWhere('display_name ilike :keyword', { keyword: '%' + keyword + '%' })
      }))
    }

    query = query
      .orderBy('id', 'DESC')
      .andWhere('deleted_at IS NULL')
      .skip(start)
      .take(perPage)
      .getManyAndCount()

    return query
  }

  public async getAllPermissionByRole(roleId: number): Promise<Permissions[]> {
    const connection = await this.db.getConnection()

    return connection
      .createQueryBuilder()
      .select([
        'permissions.id',
        'permissions.name',
        'permissions.display_name',
        'permissions.description',
        'permissions.created_at',
        'permissions.updated_at'
      ])
      .from(Permissions, 'permissions')
      .innerJoin('role_permission', 'role_permission', 'role_permission.permission_id = permissions.id')
      .where('role_permission.role_id = :id', {id: roleId})
      .andWhere('permissions.deleted_at IS NULL')
      .getMany()
  }

  public async getAllPermissionByRoleIds(roleIds: number[]): Promise<Permissions[]> {
    const connection = await this.db.getConnection()

    return connection
      .createQueryBuilder()
      .select([
        'permissions.id',
        'permissions.name',
        'permissions.display_name',
        'permissions.description',
        'permissions.created_at',
        'permissions.updated_at'
      ])
      .from(Permissions, 'permissions')
      .innerJoin('role_permission', 'role_permission', 'role_permission.permission_id = permissions.id')
      .where('role_permission.role_id IN (:...roleIds)', {roleIds})
      .andWhere('permissions.deleted_at IS NULL')
      .getMany()
  }

  public async getAllPermissionByUser(userId: any): Promise<Permissions[]> {
    const connection = await this.db.getConnection()

    return connection
      .createQueryBuilder()
      .select([
        'permissions.id',
        'permissions.name',
        'permissions.display_name',
        'permissions.description',
        'permissions.created_at',
        'permissions.updated_at'
      ])
      .from(Permissions, 'permissions')
      .innerJoin('user_permissions', 'user_permissions', 'user_permissions.permission_id = permissions.id')
      .where('user_permissions.user_id = :id', {id: userId})
      .andWhere('permissions.deleted_at IS NULL')
      .getMany()
  }

  public async seederPermission(permissions: object): Promise<InsertResult> {
    const connection = await this.db.getConnection()

    return connection.createQueryBuilder()
      .insert()
      .into(Permissions)
      .values(permissions)
      .execute();
  }
}

export default PermissionsRepository
