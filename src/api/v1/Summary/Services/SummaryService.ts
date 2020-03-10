import { UserRepository } from '../../Users/Repositories'
import { TYPE } from '../../../../infrastructure/constanst'
import InvokeLambda from '../../../../infrastructure/Services/InvokeLambda'

const lambda = new InvokeLambda()

class SummaryService {
  protected userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  public async getSummary(data): Promise<any> {
    const { organization_id, user } = data
    const distributorCount = await this.userRepository.countCustomerOrDistributorActive(Object.assign(data, { type: TYPE.DISTRIBUTOR }))
    const customerCount = await this.userRepository.countCustomerOrDistributorActive(Object.assign(data, { type: TYPE.CUSTOMER }))
    const usersCount = await this.userRepository.countUserActive(data)
    const deviceSummary = await SummaryService.getDeviceSummary({ organization_id, user })
    const { device_active = 0, device_inactive = 0, device_inventory = 0, device_assigned = 0 } = deviceSummary

    return {
      distributor: distributorCount,
      customer: customerCount,
      users: usersCount,
      device_active,
      device_inactive,
      device_inventory,
      device_assigned
    }
  }

  private static async getDeviceSummary(data): Promise<any> {
    const { user } = data
    const Payload = { requestContext: { authorizer: { user } } }
    const stage = process.env.APP_ENV
    const response = await lambda.invokeLambda(`vxDeviceService-${stage}-devices-summary`, Payload)
    if (response) {
      const { body } = response
      const { data } = JSON.parse(body)

      return data
    }
    return {}
  }

  public async countCustomerOrDistributorActive(data): Promise<number> {
    return await this.userRepository.countCustomerOrDistributorActive(data)
  }

  public async countUserActive(data): Promise<number> {
    return await this.userRepository.countUserActive(data)
  }
}

export default SummaryService
