import jwt from 'jsonwebtoken'
import { BaseRepository } from '@alpha/alpha-framework/dist/Repositories'
import { User } from '../../Users/Entities'

class AuthRepository extends BaseRepository<User> {
  constructor() {
    super()
  }

  static generateTokenFromUser(user, expiresIn): string {
    return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn })
  }
}

export default AuthRepository
