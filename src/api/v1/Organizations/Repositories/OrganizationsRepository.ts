import { Brackets, EntityRepository } from 'typeorm'

import { PER_PAGE } from '../../../../infrastructure/constanst'
import BaseRepository from '../../../../infrastructure/Repositories'
import Organizations from '../Entities/Organizations'
import OrganizationUser from '../Entities/OrganizationUser'

@EntityRepository(Organizations)
class OrganizationsRepository extends BaseRepository<Organizations> {

  constructor() {
    super(Organizations, 'organizations')
  }

  public async findPagination(options): Promise<object> {
    const { page, keyword } = options
    const perPage = PER_PAGE
    const start = perPage * (page - 1)
    const connection = await this.db.getConnection()
    let res = connection
      .getCustomRepository(OrganizationsRepository)
      .createQueryBuilder('organizations')
      .leftJoinAndSelect('organizations.setting', 'organization_setting')
      .leftJoinAndSelect('organizations.thumbnail', 'thumbnail')
      .where('deleted_at IS NULL')

    if (keyword !== '') {
      res = res.andWhere(new Brackets(subQuery => {
        subQuery.where('name ilike :keyword', { keyword: '%' + keyword + '%' })
          .orWhere('phone ilike :keyword', { keyword: '%' + keyword + '%' })
      }))
    }

    res = res
      .orderBy('id', 'DESC')
      .andWhere('deleted_at IS NULL')
      .skip(start)
      .take(perPage)
      .getManyAndCount()

    return res
  }

  public async getOrganizationByUserId(userId: number, type: any): Promise<Organizations> {
    const connection = await this.db.getConnection()

    let query = connection
      .createQueryBuilder(Organizations, 'organizations')
      .leftJoinAndSelect('organizations.setting', 'organization_setting')
      .leftJoinAndSelect('organizations.thumbnail', 'thumbnail')
      .innerJoin(OrganizationUser, 'organization_user', 'organization_user.organization_id = organizations.id')
      .where('organization_user.user_id = :userId', { userId })
    if (typeof type == 'number') {
      query = query.andWhere('organizations.type = :type', { type })
    }
    query = query.andWhere('organization_user.deleted_at IS NULL')
      .andWhere('organizations.deleted_at IS NULL')
      .getOne()

    return query
  }

  public async showOrganization(id: number): Promise<Organizations> {
    const connection = await this.db.getConnection()

    return connection.createQueryBuilder(Organizations, 'organizations')
      .leftJoinAndSelect('organizations.thumbnail', 'thumbnail')
      .leftJoinAndSelect('organizations.setting', 'organization_setting')
      .where('organizations.id = :id', { id })
      .andWhere('organizations.deleted_at IS NULL')
      .getOne()
  }

  public async getAllWithKeyword(options): Promise<object> {
    const { keyword } = options
    const connection = await this.db.getConnection()
    return connection
      .getCustomRepository(OrganizationsRepository)
      .createQueryBuilder('organizations')
      .select(['id', 'name'])
      .where('deleted_at IS NULL')
      .andWhere('name ilike :keyword', { keyword: '%' + keyword + '%' })
      .orderBy('id', 'DESC')
      .andWhere('deleted_at IS NULL')
      .getRawMany()
  }
}

export default OrganizationsRepository
