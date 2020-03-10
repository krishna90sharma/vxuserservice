import { EntityRepository, UpdateResult } from 'typeorm'

import BaseRepository from '../../../../infrastructure/Repositories'
import Address from '../Entities/Address'
import { BILLING_ADDRESS, PER_PAGE, SHIPPING_ADDRESS } from '../../../../infrastructure/constanst'

@EntityRepository(Address)
class AddressRepository extends BaseRepository<Address> {

  constructor() {
    super(Address, 'address')
  }

  public async findAddress(options): Promise<[Address[], number]> {
    const { page, id, type } = options
    const perPage = PER_PAGE
    const start = perPage * (page - 1)
    const connection = await this.db.getConnection()
    return connection
      .getCustomRepository(AddressRepository)
      .createQueryBuilder('address')
      .leftJoinAndSelect('address.billing', 'billing', `billing.type = ${BILLING_ADDRESS}`)
      .leftJoinAndSelect('address.shipping', 'shipping', `shipping.type = ${SHIPPING_ADDRESS}`)
      .where('address.deleted_at IS NULL')
      .andWhere('address.addressable_id = :id', { id })
      .andWhere('address.addressable_type = :type', { type })
      .orderBy('address.id', 'DESC')
      .skip(start)
      .take(perPage)
      .getManyAndCount()
  }

  public async showAddress(id): Promise<Address | undefined> {
    const connection = await this.db.getConnection()

    return connection
      .getCustomRepository(AddressRepository)
      .createQueryBuilder('address')
      .leftJoinAndSelect('address.billing', 'billing', `billing.type = ${BILLING_ADDRESS}`)
      .leftJoinAndSelect('address.shipping', 'shipping', `shipping.type = ${SHIPPING_ADDRESS}`)
      .where('address.id = :id', { id })
      .andWhere('address.deleted_at IS NULL')
      .getOne()
  }

  public async showAddressDefault(data): Promise<Address | undefined> {
    const { id, type } = data
    const connection = await this.db.getConnection()

    return connection
      .getCustomRepository(AddressRepository)
      .createQueryBuilder('address')
      .leftJoinAndSelect('address.billing', 'billing', `billing.type = ${BILLING_ADDRESS}`)
      .leftJoinAndSelect('address.shipping', 'shipping', `shipping.type = ${SHIPPING_ADDRESS}`)
      .where('address.addressable_id = :id', { id })
      .andWhere('address.addressable_type = :type', { type })
      .andWhere('address.deleted_at IS NULL')
      .andWhere('address.default = 1')
      .getOne()
  }

  public async updateDefault(data): Promise<UpdateResult> {
    const { type_id, id } = data
    const connection = await this.db.getConnection()

    return connection
      .createQueryBuilder()
      .update(Address)
      .set({ default: 0 })
      .where('id != :id', { id })
      .andWhere('addressable_id = :type_id', { type_id })
      .execute()
  }
}

export default AddressRepository
