import PhonesRepository from '../Repositories/PhonesRepository'
import Phones from '../Entities/Phones'
import { InsertResult } from 'typeorm'

class PhonesService {
  protected phonesRepository: PhonesRepository

  constructor() {
    this.phonesRepository = new PhonesRepository()
  }

  public async show(id): Promise<Phones[]> {
    return await this.phonesRepository.getPhonesByAddress(id)
  }
  public async getPhonesByAddress(id): Promise<Phones[]> {
    return await this.phonesRepository.getPhonesByAddress(id)
  }

  public async store(data): Promise<InsertResult> {
    return await this.phonesRepository.store(data)
  }

  public async update(id, data): Promise<number> {
    if (id) {
      await this.phonesRepository.updateDataById(id, data)

      return id
    }
    const thumbnail = await this.phonesRepository.store(data)

    return thumbnail.identifiers[0].id
  }

  public async delete(ids): Promise<any> {
    return await this.phonesRepository.deleteDataWithIds(ids)
  }
}

export default PhonesService
