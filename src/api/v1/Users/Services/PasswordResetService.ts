import { DeleteResult, InsertResult } from 'typeorm'

import { PasswordResetRepository } from '../Repositories'
import { PasswordResets } from '../Entities'

class PasswordResetService {
  protected passwordResetRepository: PasswordResetRepository

  constructor() {
    this.passwordResetRepository = new PasswordResetRepository()
  }

  public async store(data): Promise<InsertResult> {
    return await this.passwordResetRepository.store(data)
  }

  public async checkTokenResetPassword(data: { email: string, token: string }): Promise<PasswordResets | undefined> {
    return await this.passwordResetRepository.checkTokenResetPassword(data)
  }

  public async delete(email: string): Promise<DeleteResult> {
    return await this.passwordResetRepository.destroyBy({ key: 'email', value: email })
  }
}

export default PasswordResetService
