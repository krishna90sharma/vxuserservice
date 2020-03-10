import { LambdaResponseTrait } from '@alpha/alpha-framework/dist/Traits'
import bcrypt from 'bcryptjs'
import { UserRepository } from '../../Users/Repositories'
import AuthRepository from '../Repositories/AuthRepository'
import TokenRepository from '../Repositories/TokenRepository'
import OrganizationsRepository from '../../Organizations/Repositories/OrganizationsRepository'
import { ACTIVE, EMAIL_VERIFIED, TYPE } from '../../../../infrastructure/constanst'

const { error, success } = LambdaResponseTrait

class AuthService {
  protected userRepository: UserRepository
  protected authRepository: AuthRepository
  protected tokenRepository: TokenRepository
  protected organizationRepository: OrganizationsRepository

  constructor() {
    this.userRepository = new UserRepository()
    this.authRepository = new AuthRepository()
    this.tokenRepository = new TokenRepository()
    this.organizationRepository = new OrganizationsRepository()
  }

  public async login(data: any): Promise<any> {
    const { body, requestContext: { identity: { userAgent } } } = data
    const { email, password, type = null } = JSON.parse(body)
    const user = await this.userRepository.login({ email })

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return error('Invalid login email or password', 400)
    }

    if (user.is_email_verified !== EMAIL_VERIFIED) {
      return error('Email not verified', 403)
    }
    if (user.status !== ACTIVE) {
      return error('User is not active. Please activate the account', 403)
    }

    const organization = await this.organizationRepository.getOrganizationByUserId(user.id, type)
    if (!organization) {
      return error('You are not authorized', 403)
    }

    if (organization.type === TYPE.SYS_ADMIN && type !== TYPE.SYS_ADMIN) {
      return error('You are not authorized', 403)
    }

    if (user && organization) {
      const { id, type, setting = {} } = organization
      const { drp_logofftime = 20 } = setting
      user.organization_id = id
      user.organization_type = type
      Object.assign(user, { live_time: drp_logofftime })
      const token = AuthRepository.generateTokenFromUser(user, `${drp_logofftime}m`)
      const refreshToken = AuthRepository.generateTokenFromUser(user, '1 days')

      if (token) {
        const tokenInsert = {
          user_agent: userAgent,
          user_id: user.id,
          access_token: token,
          token_type: 'JWT',
        }
        await this.tokenRepository.store(tokenInsert)

        const response = {
          token,
          refresh_token: refreshToken,
          expires_in: drp_logofftime
        }

        return success(response)
      }
    }

    return error('Wrong login password', 400)
  }

  public async logout(token: string): Promise<any> {
    return await this.tokenRepository.logout(token)
  }

  static async refreshToken(user): Promise<any> {
    const { live_time = 20 } = user
    const token = AuthRepository.generateTokenFromUser(user, `${live_time}m`)
    const refreshToken = AuthRepository.generateTokenFromUser(user, '1 days')

    const response = {
      token,
      refresh_token: refreshToken,
      expires_in: live_time
    }

    return success(response)
  }
}

export default AuthService
