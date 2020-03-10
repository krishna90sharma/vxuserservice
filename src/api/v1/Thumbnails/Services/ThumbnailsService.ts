import ThumbnailsRepository from '../Repositories/ThumbnailsRepository'
import Thumbnails from '../Entities/Thumbnails'
import { InsertResult } from 'typeorm'

class ThumbnailsService {
  protected thumbnailsRepository: ThumbnailsRepository

  constructor() {
    this.thumbnailsRepository = new ThumbnailsRepository()
  }

  public async find(options): Promise<object> {
    return await this.thumbnailsRepository.getAll(options)
  }

  public async show(id): Promise<Thumbnails> {
    return await this.thumbnailsRepository.show(id)
  }

  public async store(data): Promise<InsertResult> {
    return await this.thumbnailsRepository.store(data)
  }

  public async update(id, data): Promise<number> {
    if (id) {
      await this.thumbnailsRepository.updateDataById(id, data)

      return id
    }
    const thumbnail = await this.thumbnailsRepository.store(data)

    return thumbnail.identifiers[0].id
  }

  public async delete(ids): Promise<any> {
    return await this.thumbnailsRepository.deleteDataWithIds(ids)
  }
}

export default ThumbnailsService
