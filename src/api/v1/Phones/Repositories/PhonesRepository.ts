import { EntityRepository } from 'typeorm'

import BaseRepository from '../../../../infrastructure/Repositories'
import Phones from '../Entities/Phones'


@EntityRepository(Phones)
class PhonesRepository extends BaseRepository<Phones> {

  constructor() {
    super(Phones, 'phones')
  }

  public async getPhonesByAddress(id: number): Promise<Phones[]> {
    const connection = await this.db.getConnection()
    return connection
      .getCustomRepository(PhonesRepository)
      .createQueryBuilder('phones')
      .where('phones.deleted_at IS NULL')
      .andWhere('phones.address_id = :id', { id })
      .orderBy('phones.id', 'DESC')
      .getMany()
  }
}

export default PhonesRepository
