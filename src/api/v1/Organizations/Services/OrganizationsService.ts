import { ORGANIZATION_SETTING_DEFAULT, THUMBNAIL_DEFAULT } from '../../../../infrastructure/constanst'
import OrganizationsRepository from '../Repositories/OrganizationsRepository'
import OrganizationUserRepository from '../Repositories/OrganizationUserRepository'
import Organizations from '../Entities/Organizations'
import { InsertResult, UpdateResult } from 'typeorm'
import OrganizationSettingRepository from '../Repositories/OrganizationSettingRepository'

class OrganizationsService {
  protected organizationsRepository: OrganizationsRepository
  protected organizationUserRepository: OrganizationUserRepository
  protected organizationSettingRepository: OrganizationSettingRepository

  constructor() {
    this.organizationsRepository = new OrganizationsRepository()
    this.organizationUserRepository = new OrganizationUserRepository()
    this.organizationSettingRepository = new OrganizationSettingRepository()
  }

  public async find(options): Promise<object> {
    return await this.organizationsRepository.findPagination(options)
  }

  public async getAllWithKeyword(options): Promise<object> {
    return await this.organizationsRepository.getAllWithKeyword(options)
  }

  public async show(id): Promise<Organizations> {
    const organization = await this.organizationsRepository.showOrganization(id)
    organization.setting = organization.setting || ORGANIZATION_SETTING_DEFAULT
    organization.thumbnail = organization.thumbnail || THUMBNAIL_DEFAULT

    return organization
  }

  public async store(data): Promise<InsertResult> {
    return await this.organizationsRepository.store(data)
  }

  public async update(id, data): Promise<any> {
    console.log(data, '===DATA')
    const { setting, ...organization } = data
    if (setting) {
      const { id: settingId, ...settingData } = setting

      if (settingId) {
        await this.organizationSettingRepository.updateDataById(settingId, settingData)
      } else {
        const newSetting = await this.organizationSettingRepository.store(settingData)
        organization.setting_id = newSetting.identifiers[0].id
      }
    }
    return await this.organizationsRepository.updateDataById(id, organization)
  }

  public async delete(ids): Promise<UpdateResult> {
    return await this.organizationsRepository.deleteDataWithIds(ids)
  }

  public async attachOrganization(data): Promise<any> {
    const { user_id } = data
    await this.organizationUserRepository.destroyBy({ key: 'user_id', value: user_id })
    return await this.organizationUserRepository.store(data)
  }

  public async storeSetting(data): Promise<InsertResult> {
    return await this.organizationSettingRepository.store(data)
  }

  public async getOrganizationByUserId(userId: number, type: any): Promise<Organizations> {
    const organization = await this.organizationsRepository.getOrganizationByUserId(userId, type)

    if (organization) {
      organization.setting = organization.setting || ORGANIZATION_SETTING_DEFAULT
      organization.thumbnail = organization.thumbnail || THUMBNAIL_DEFAULT
    }

    return organization
  }
}

export default OrganizationsService
