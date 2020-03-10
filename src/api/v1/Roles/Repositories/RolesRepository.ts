import { Brackets, EntityRepository } from 'typeorm'

import Roles from '../Entities/Roles'
import BaseRepository from '../../../../infrastructure/Repositories'
import { PER_PAGE } from '../../../../infrastructure/constanst'

@EntityRepository(Roles)
class RolesRepository extends BaseRepository<Roles> {

  constructor() {
    super(Roles, 'roles')
  }

  public async getAll(options): Promise<[Roles[], number]> {
    const {page, keyword, organization_id} = options
    const perPage = PER_PAGE
    const start = perPage * (page - 1)
    const connection = await this.db.getConnection()
    let query = connection
      .getCustomRepository(RolesRepository)
      .createQueryBuilder('roles')
      .where('deleted_at IS NULL')
      .andWhere('organization_id = :organization_id', {organization_id})

    if (keyword !== '') {
      query = query.andWhere(new Brackets(subQuery => {
        subQuery.where('name ilike :keyword', { keyword: '%' + keyword + '%' })
          .orWhere('display_name ilike :keyword', { keyword: '%' + keyword + '%' })
      }))
    }

    query = query
      .orderBy('id', 'DESC')
      .skip(start)
      .take(perPage)
      .getManyAndCount()

    return query
  }
}

export default RolesRepository
