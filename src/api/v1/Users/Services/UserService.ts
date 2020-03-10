import UserRepository from '../Repositories/UserRepository'
import UserRoleRepository from '../../Roles/Repositories/UserRoleRepository'
import UserPermissionRepository from '../../Permissions/Repositories/UserPermissionRepository'
import User from '../Entities/User'
import { InsertResult } from 'typeorm'
import { TYPE } from '../../../../infrastructure/constanst'

class UserService {
  protected userRepository: UserRepository
  protected userRoleRepository: UserRoleRepository
  protected userPermissionRepository: UserPermissionRepository

  constructor() {
    this.userRepository = new UserRepository()
    this.userRoleRepository = new UserRoleRepository()
    this.userPermissionRepository = new UserPermissionRepository()
  }

  public async find(options): Promise<[User[], number]> {
    return await this.userRepository.findAllUser(options)
  }

  public async show(id): Promise<User> {
    return await this.userRepository.show(id)
  }

  public async store(data): Promise<InsertResult> {
    return await this.userRepository.createUser(data)
  }

  public async getUserByOrganization(organizationId: number, options: object): Promise<any> {
    return await this.userRepository.getUserByOrganization(organizationId, options)
  }

  public async getAllUserDataOfOrganization(organizationId: number): Promise<User[]> {
    return await this.userRepository.getAllUserDataOfOrganization(organizationId)
  }

  public async update(id: number, data: any): Promise<any> {
    return await this.userRepository.updateDataById(id, data)
  }

  public async delete(ids): Promise<any> {
    return await this.userRepository.deleteDataWithIds(ids)
  }

  public async getCountUserByRoleAndOrganization(roleId: number, organizationId: number): Promise<number> {
    return await this.userRepository.getCountUserByRoleAndOrganization(roleId, organizationId)
  }

  public async checkEmailExists(data): Promise<User | undefined> {
    return await this.userRepository.checkEmail(data)
  }

  public async getOwnerOfOrganization(organizationId: number): Promise<User> {
    return await this.userRepository.getOwnerOfOrganization(organizationId)
  }

  public async countSubUser(options): Promise<object> {
    const { type } = options
    const res = {
      distributor: 0,
      customer: 0,
      user: 0,
    }

    if (type === TYPE.DISTRIBUTOR) {
      res.distributor = await this.userRepository.countCustomerOrDistributor(options)
    }

    res.customer = await this.userRepository.countCustomerOrDistributor({ ...options, type: TYPE.CUSTOMER })
    res.user = await this.userRepository.countUsers(options)

    return res
  }
}

export default UserService
