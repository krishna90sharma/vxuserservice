import { DeleteResult, InsertResult, ObjectLiteral, Repository, UpdateResult } from 'typeorm'
import moment from 'moment'
import _ from 'lodash'

import { DatabaseConnect } from '../connection'
import { PER_PAGE } from '../constanst'

class BaseRepository<Entity extends ObjectLiteral> extends Repository<Entity> {
  protected db: any
  protected entities: any
  protected tableName: string

  constructor(Entities: any, tableName: string) {
    super()
    this.db = new DatabaseConnect()
    this.entities = Entities
    this.tableName = tableName
  }

  public async findAll(options): Promise<object> {
    const { page } = options
    const perPage = PER_PAGE
    const start = perPage * (page - 1)
    const connection = await this.db.getConnection()

    return connection
      .getRepository(this.entities)
      .createQueryBuilder(this.tableName)
      .where('deleted_at IS NULL')
      .orderBy('id', 'DESC')
      .andWhere('deleted_at IS NULL')
      .skip(start)
      .take(perPage)
      .getManyAndCount()
  }

  public async store(data): Promise<InsertResult> {
    const connection = await this.db.getConnection()
    const columns = connection.getMetadata(this.entities).columns.map(column => column.propertyName)
    const dataStore = Array.isArray(data) ? data.map((item) => _.pick(item, columns)) : _.pick(data, columns)

    return connection
      .createQueryBuilder()
      .insert()
      .into(this.entities)
      .values(dataStore)
      .execute()
  }

  public async show(id): Promise<Entity> {
    const connection = await this.db.getConnection()

    return connection
      .getRepository(this.entities)
      .createQueryBuilder(this.tableName)
      .orderBy('id', 'DESC')
      .where('id = :id', { id: id })
      .andWhere('deleted_at IS NULL')
      .getOne()
  }

  public async updateDataById(id: number, data: any): Promise<UpdateResult> {
    const connection = await this.db.getConnection()
    const columns = connection.getMetadata(this.entities).columns.map(column => column.propertyName)
    data.updated_at = moment().format('Y-MM-DD HH:mm:ss')
    const dataUpdate = Array.isArray(data) ? data.map((item) => _.pick(item, columns)) : _.pick(data, columns)
    delete dataUpdate.id

    return connection
      .createQueryBuilder()
      .update(this.entities)
      .set(dataUpdate)
      .where('id = :id', { id: id })
      .execute()
  }

  public async deleteDataWithIds(ids: any): Promise<UpdateResult> {
    const connection = await this.db.getConnection()

    return connection
      .createQueryBuilder()
      .update(this.entities)
      .set({
        deleted_at: moment().format('Y-MM-DD HH:mm:ss')
      })
      .whereInIds(ids)
      .execute()
  }

  public async destroyById(id: any): Promise<DeleteResult> {
    const connection = await this.db.getConnection()

    return connection
      .getRepository(this.entities)
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute()
  }

  public async findBy(data): Promise<Entity> {
    const { key, value } = data
    const connection = await this.db.getConnection()

    return connection
      .getRepository(this.entities)
      .createQueryBuilder(this.tableName)
      .orderBy('id', 'DESC')
      .where(`${key} = :value`, { value })
      .andWhere('deleted_at IS NULL')
      .getOne()
  }

  public async destroyBy(data: any): Promise<DeleteResult> {
    const { key, value } = data
    const connection = await this.db.getConnection()

    return connection
      .getRepository(this.entities)
      .createQueryBuilder()
      .delete()
      .where(`${key} = :value`, { value })
      .execute()
  }
}

export default BaseRepository
