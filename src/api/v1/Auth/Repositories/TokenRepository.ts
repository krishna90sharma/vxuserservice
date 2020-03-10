import { EntityRepository, UpdateResult } from 'typeorm'
import { Token } from '../Entities'
import BaseRepository from '../../../../infrastructure/Repositories'
import moment from 'moment'

@EntityRepository(Token)
class TokenRepository extends BaseRepository<Token> {

  constructor() {
    super(Token, 'tokens')
  }

  public async logout(token): Promise<UpdateResult> {
    const connection = await this.db.getConnection()

    return connection
      .createQueryBuilder()
      .update(Token)
      .set({
        deleted_at: moment().format('Y-MM-DD HH:mm:ss')
      })
      .where('access_token = :token', { token })
      .execute()
  }
}

export default TokenRepository
