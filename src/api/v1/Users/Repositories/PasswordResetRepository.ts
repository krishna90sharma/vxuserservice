import { EntityRepository } from 'typeorm'
import { PasswordResets } from '../Entities'
import BaseRepository from '../../../../infrastructure/Repositories'
import moment from 'moment'

@EntityRepository(PasswordResets)
class PasswordResetRepository extends BaseRepository<PasswordResets> {

  constructor() {
    super(PasswordResets, 'password_resets')
  }

  async checkTokenResetPassword(data: { email: string, token: string }): Promise<PasswordResets | undefined> {
    const { email, token } = data
    const connection = await this.db.getConnection()
    const currentTime = moment().format('YYYY-MM-DD HH:mm:ss')

    return connection
      .getCustomRepository(PasswordResetRepository)
      .createQueryBuilder('password_resets')
      .where('email = :email', { email })
      .andWhere('token = :token', { token })
      .andWhere('expired_at >= :currentTime', { currentTime })
      .getOne()
  }
}

export default PasswordResetRepository
