import AddressRepository from '../Repositories/AddressRepository'
import Address from '../Entities/Address'
import { InsertResult, UpdateResult } from 'typeorm'
import AddressDetailRepository from '../Repositories/AddressDetailRepository'
import PhonesRepository from '../../Phones/Repositories/PhonesRepository'

class AddressService {
  protected addressRepository: AddressRepository
  protected addressDetailRepository: AddressDetailRepository
  protected phoneRepository: PhonesRepository

  constructor() {
    this.addressRepository = new AddressRepository()
    this.addressDetailRepository = new AddressDetailRepository()
    this.phoneRepository = new PhonesRepository()
  }

  public async find(options): Promise<[Address[], number]> {
    return await this.addressRepository.findAddress(options)
  }

  public async show(id): Promise<Address | undefined> {
    return await this.addressRepository.showAddress(id)
  }

  public async getDefault(data): Promise<Address | undefined> {
    return await this.addressRepository.showAddressDefault(data)
  }

  public async store(data): Promise<InsertResult> {
    return await this.addressRepository.store(data)
  }

  public async updateDefault(data): Promise<UpdateResult> {
    return await this.addressRepository.updateDefault(data)
  }

  public async update(id, data): Promise<number> {
    if (id) {
      await this.addressRepository.updateDataById(id, data)

      return id
    }
    const thumbnail = await this.addressRepository.store(data)

    return thumbnail.identifiers[0].id
  }

  public async delete(ids): Promise<any> {
    return await this.addressRepository.deleteDataWithIds(ids)
  }

  public async storeAddressDetail(data): Promise<InsertResult> {
    return await this.addressDetailRepository.store(data)
  }

  public async updateAddressDetail(id, data): Promise<UpdateResult> {
    await this.phoneRepository.destroyBy({ key: 'address_id', value: id })
    return await this.addressDetailRepository.updateDataById(id, data)
  }
}

export default AddressService
