import { EntityRepository } from 'typeorm'

import BaseRepository from '../../../../infrastructure/Repositories'
import OrganizationSetting from '../Entities/OrganizationSetting'

@EntityRepository(OrganizationSetting)
class OrganizationSettingRepository extends BaseRepository<OrganizationSetting> {

  constructor() {
    super(OrganizationSetting, 'organization_setting')
  }
}

export default OrganizationSettingRepository
