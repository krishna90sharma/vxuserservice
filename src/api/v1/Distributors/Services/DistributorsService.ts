import { InsertResult } from 'typeorm'
import User from '../../Users/Entities/User'
import UserRepository from '../../Users/Repositories/UserRepository'

class DistributorsService {
  protected userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  public async find(options): Promise<[User[], number]> {
    return await this.userRepository.findAllCustomerOrDistributor(options)
  }

  public async findUserForAssignDevice(options): Promise<User[]> {
    return await this.userRepository.findUserForAssignDevice(options)
  }

  public async show(id: number, type: number): Promise<User> {
    return await this.userRepository.findUserByType(id, type)
  }

  public async store(data): Promise<InsertResult> {
    return await this.userRepository.createUser(data)
  }

  public async update(id: number, data: any): Promise<any> {
    return await this.userRepository.updateDataById(id, data)
  }

  public async checkEmailExists(data): Promise<User | undefined> {
    return await this.userRepository.checkEmail(data)
  }
}

export default DistributorsService
