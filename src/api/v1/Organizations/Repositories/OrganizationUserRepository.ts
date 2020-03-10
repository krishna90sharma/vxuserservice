import { EntityRepository } from 'typeorm';

import BaseRepository from "../../../../infrastructure/Repositories";
import OrganizationUser from "../Entities/OrganizationUser";

@EntityRepository(OrganizationUser)
class OrganizationUserRepository extends BaseRepository<OrganizationUser> {

  constructor() {
    super(OrganizationUser, 'organization_user');
  }

  public async checkOrganizationExistsByUserId(organizationId: number, userId: number): Promise<OrganizationUser> {
    const connection = await this.db.getConnection();

    return await connection
      .getRepository(OrganizationUser)
      .createQueryBuilder("organization_user")
      .where('user_id = :user_id', {user_id: userId})
      .andWhere('organization_id = :organization_id', {organization_id: organizationId})
      .andWhere('deleted_at IS NULL')
      .getOne();
  }
}

export default OrganizationUserRepository;
