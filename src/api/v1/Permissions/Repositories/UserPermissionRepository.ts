import { EntityRepository } from 'typeorm';

import BaseRepository from "../../../../infrastructure/Repositories";
import UserPermission from "../Entities/UserPermission";

@EntityRepository(UserPermission)
class UserPermissionRepository extends BaseRepository<UserPermission> {

  constructor() {
    super(UserPermission, 'user_permissions');
  }

  public async checkPermissionExistsByUserId(permissionId: number, userId: number): Promise<UserPermission> {
    const connection = await this.db.getConnection();

    return await connection
      .getRepository(UserPermission)
      .createQueryBuilder("user_permission")
      .where('user_id = :user_id', {user_id: userId})
      .andWhere('permission_id = :permission_id', {permission_id: permissionId})
      .getOne();
  }
}

export default UserPermissionRepository;
