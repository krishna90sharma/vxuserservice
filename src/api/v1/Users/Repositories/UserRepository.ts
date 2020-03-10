import { EntityRepository, InsertResult, Brackets } from 'typeorm'
import { User } from '../Entities'
import BaseRepository from '../../../../infrastructure/Repositories'
import { ACTIVE, LIMIT_GET_USER_ASSIGN, PER_PAGE, TYPE } from '../../../../infrastructure/constanst'
import OrganizationUser from '../../Organizations/Entities/OrganizationUser'
import Organizations from '../../Organizations/Entities/Organizations'

@EntityRepository(User)
class UserRepository extends BaseRepository<User> {

  constructor() {
    super(User, 'users')
  }

  public async findAllUser(options): Promise<[User[], number]> {
    const { page, keyword, organization_id } = options
    const perPage = PER_PAGE
    const start = perPage * (page - 1)
    const connection = await this.db.getConnection()
    let query = connection
      .getCustomRepository(UserRepository)
      .createQueryBuilder('users')
      .innerJoin(OrganizationUser, 'organization_user', 'organization_user.user_id = users.id')
      .where('users.deleted_at IS NULL')
      .andWhere('organization_user.organization_id = :organization_id', { organization_id })

    if (keyword !== '') {
      query = query.andWhere(new Brackets(subQuery => {
        subQuery.where('users.first_name ilike :keyword', { keyword: '%' + keyword + '%' })
          .orWhere('users.last_name ilike :keyword', { keyword: '%' + keyword + '%' })
          .orWhere('users.email ilike :keyword', { keyword: '%' + keyword + '%' })
      }))
    }

    query = query
      .orderBy('users.id', 'DESC')
      .skip(start)
      .take(perPage)
      .getManyAndCount()

    return query
  }

  public async findAllCustomerOrDistributor(options): Promise<[User[], number]> {
    const { page, keyword, create_by, organization_id, type } = options
    const perPage = PER_PAGE
    const start = perPage * (page - 1)
    const connection = await this.db.getConnection()
    let query = connection
      .getCustomRepository(UserRepository)
      .createQueryBuilder('users')
      .innerJoin(OrganizationUser, 'organization_user', 'organization_user.user_id = users.id')
      .innerJoin(Organizations, 'organizations', 'organization_user.organization_id = organizations.id')
      .where('users.deleted_at IS NULL')
      .andWhere('organization_user.organization_id != :organization_id', { organization_id })
      .andWhere('organizations.type = :type', { type })
      .andWhere('users.create_by = :create_by', { create_by })
      .andWhere('users.id != :create_by', { create_by })

    if (keyword !== '') {
      query = query.andWhere(new Brackets(subQuery => {
        subQuery.where('users.first_name ilike :keyword', { keyword: '%' + keyword + '%' })
          .orWhere('users.last_name ilike :keyword', { keyword: '%' + keyword + '%' })
          .orWhere('users.email ilike :keyword', { keyword: '%' + keyword + '%' })
          .orWhere('organizations.name ilike :keyword', { keyword: '%' + keyword + '%' })
      }))
    }

    query = query
      .orderBy('users.id', 'DESC')
      .skip(start)
      .take(perPage)
      .getManyAndCount()

    return query
  }

  public async findUserForAssignDevice(options): Promise<User[]> {
    const connection = await this.db.getConnection()
    const { keyword, create_by, organization_id } = options
    const limit = LIMIT_GET_USER_ASSIGN
    const select = [
      'users.first_name as first_name',
      'users.id as user_id',
      'users.last_name as last_name',
      'users.email as email',
      'organization_user.*',
      'organizations.name as organization_name',
      'organizations.type as organization_type'
    ]

    let query = connection
      .getCustomRepository(UserRepository)
      .createQueryBuilder('users')
      .select(select)
      .innerJoin(OrganizationUser, 'organization_user', 'organization_user.user_id = users.id')
      .innerJoin(Organizations, 'organizations', 'organization_user.organization_id = organizations.id')
      .where('users.deleted_at IS NULL')
      .andWhere('organization_user.organization_id != :organization_id', { organization_id })
      .andWhere(`(organizations.type = ${TYPE.DISTRIBUTOR} OR organizations.type = ${TYPE.CUSTOMER})`)
      .andWhere('users.create_by = :create_by', { create_by })
      .andWhere('users.id != :create_by', { create_by })

    if (keyword) {
      query = query.andWhere(new Brackets(subQuery => {
        subQuery.where('users.first_name ilike :keyword', { keyword: '%' + keyword + '%' })
          .orWhere('users.last_name ilike :keyword', { keyword: '%' + keyword + '%' })
          .orWhere('users.email ilike :keyword', { keyword: '%' + keyword + '%' })
          .orWhere('organizations.name ilike :keyword', { keyword: '%' + keyword + '%' })
      }))
    }

    return query
      .orderBy('users.id', 'DESC')
      .limit(limit)
      .getRawMany()
  }

  public async findUserByType(id: number, type: number): Promise<User> {
    const connection = await this.db.getConnection()

    return connection
      .createQueryBuilder(User, 'users')
      .innerJoin(OrganizationUser, 'organization_user', 'organization_user.user_id = users.id')
      .innerJoin(Organizations, 'organizations', 'organization_user.organization_id = organizations.id')
      .where('users.id = :id', { id: id })
      .andWhere('organizations.type = :type', { type })
      .andWhere('organizations.deleted_at IS NULL')
      .andWhere('users.deleted_at IS NULL')
      .orderBy('users.id', 'DESC')
      .getOne()
  }

  public async getUserByOrganization(organizationId, options): Promise<object> {
    const { page, keyword } = options
    const perPage = PER_PAGE
    const start = perPage * (page - 1)
    const connection = await this.db.getConnection()
    let res = connection
      .getCustomRepository(UserRepository)
      .createQueryBuilder('users')
      .innerJoin('organization_user', 'organization_user', 'organization_user.user_id = users.id')
      .where('organization_user.organization_id = :organization_id', { organization_id: organizationId })
      .andWhere('users.deleted_at IS NULL')
      .andWhere('organization_user.deleted_at IS NULL')

    if (keyword !== '') {
      res = res.andWhere(new Brackets(subQuery => {
        subQuery.where('users.first_name ilike :keyword', { keyword: '%' + keyword + '%' })
          .orWhere('users.last_name ilike :keyword', { keyword: '%' + keyword + '%' })
          .orWhere('users.email ilike :keyword', { keyword: '%' + keyword + '%' })
      }))
    }

    res = res
      .orderBy('users.id', 'DESC')
      .skip(start)
      .take(perPage)
      .getManyAndCount()

    return res
  }

  public async getAllUserDataOfOrganization(organizationId): Promise<User[]> {
    const connection = await this.db.getConnection()
    return connection
      .getCustomRepository(UserRepository)
      .createQueryBuilder('users')
      .select([
        'users.id as id',
        'users.email as email',
        'users.first_name as first_name',
        'users.last_name as last_name',
      ])
      .innerJoin('organization_user', 'organization_user', 'organization_user.user_id = users.id')
      .where('organization_user.organization_id = :organizationId', { organizationId })
      .andWhere('users.deleted_at IS NULL')
      .andWhere('organization_user.deleted_at IS NULL')
      .orderBy('users.id', 'DESC')
      .getRawMany()
  }

  public async login(data): Promise<User> {
    const { email } = data
    const connection = await this.db.getConnection()
    const select = [
      'users.id as id',
      'users.thumbnail_id as thumbnail_id',
      'users.first_name as first_name',
      'users.last_name as last_name',
      'users.password as password',
      'users.email as email',
      'users.language as language',
      'users.phone as phone',
      'users.job_title as job_title',
      'users.address_id as address_id',
      'users.is_email_verified as is_email_verified',
      'users.status as status',
    ]

    return connection
      .getCustomRepository(UserRepository)
      .createQueryBuilder('users')
      .select(select)
      .where('email = :email', { email: email })
      .andWhere('deleted_at IS NULL')
      .getRawOne()
  }


  public async getCountUserByRoleAndOrganization(roleId, organizationId): Promise<number> {
    const connection = await this.db.getConnection()
    return connection
      .getCustomRepository(UserRepository)
      .createQueryBuilder('users')
      .innerJoin('organization_user', 'organization_user', 'organization_user.user_id = users.id')
      .innerJoin('user_role', 'user_role', 'user_role.user_id = users.id')
      .where('organization_user.organization_id = :organizationId', { organizationId })
      .andWhere('user_role.role_id = :roleId', { roleId })
      .andWhere('users.deleted_at IS NULL')
      .andWhere('organization_user.deleted_at IS NULL')
      .orderBy('users.id', 'DESC')
      .getCount()
  }

  public async createUser(data): Promise<InsertResult> {
    const connection = await this.db.getConnection()

    return connection
      .createQueryBuilder()
      .insert()
      .into(this.entities)
      .values(data)
      .execute()
  }

  public async checkEmail(data): Promise<User | undefined> {
    const { email, id } = data
    const connection = await this.db.getConnection()

    let query = connection
      .getRepository(User)
      .createQueryBuilder('users')
      .where('email = :email', { email })
      .andWhere('deleted_at IS NULL')

    if (id) {
      query = query.andWhere('id != :id', { id })
    }

    return query.getOne()
  }

  public async getOwnerOfOrganization(organizationId: number): Promise<User> {
    const connection = await this.db.getConnection()
    const select = [
      'users.id as id',
      'users.id as user_id',
      'users.first_name as first_name',
      'users.last_name as last_name',
      'users.email as email',
      'organizations.id as organization_id',
      'organizations.name as organization_name',
      'organizations.type as organization_type',
    ]

    return connection
      .getRepository(User)
      .createQueryBuilder('users')
      .select(select)
      .innerJoin(OrganizationUser, 'organization_user', 'organization_user.user_id = users.id')
      .innerJoin(Organizations, 'organizations', 'organizations.id = organization_user.organization_id')
      .where('organization_user.organization_id =:organizationId', { organizationId })
      .andWhere('users.deleted_at IS NULL')
      .andWhere(sql => {
        const subQuery = sql.subQuery()
          .select('id')
          .from(OrganizationUser, 'org_user')
          .where('org_user.deleted_at IS NULL')
          .andWhere('org_user.organization_id = :organizationId', { organizationId })
          .orderBy('id', 'ASC')
          .limit(1)
          .getQuery()

        return 'organization_user.id = ' + subQuery
      })
      .getRawOne()
  }

  public async countCustomerOrDistributorActive(options): Promise<number> {
    const { status = ACTIVE, create_by, organization_id, type } = options
    const connection = await this.db.getConnection()
    return connection
      .getCustomRepository(UserRepository)
      .createQueryBuilder('users')
      .innerJoin(OrganizationUser, 'organization_user', 'organization_user.user_id = users.id')
      .innerJoin(Organizations, 'organizations', 'organization_user.organization_id = organizations.id')
      .where('users.deleted_at IS NULL')
      .andWhere('users.status = :status', { status })
      .andWhere('organization_user.organization_id != :organization_id', { organization_id })
      .andWhere('organizations.type = :type', { type })
      .andWhere('users.create_by = :create_by', { create_by })
      .andWhere('users.id != :create_by', { create_by })
      .getCount()
  }

  public async countCustomerOrDistributor(options): Promise<number> {
    const { create_by, organization_id, type } = options
    const connection = await this.db.getConnection()
    return connection
      .getCustomRepository(UserRepository)
      .createQueryBuilder('users')
      .innerJoin(OrganizationUser, 'organization_user', 'organization_user.user_id = users.id')
      .innerJoin(Organizations, 'organizations', 'organization_user.organization_id = organizations.id')
      .where('users.deleted_at IS NULL')
      .andWhere('organization_user.organization_id != :organization_id', { organization_id })
      .andWhere('organizations.type = :type', { type })
      .andWhere('users.create_by = :create_by', { create_by })
      .andWhere('users.id != :create_by', { create_by })
      .getCount()
  }

  public async countUsers(options): Promise<number> {
    const { create_by, organization_id } = options
    const connection = await this.db.getConnection()
    return connection
      .getCustomRepository(UserRepository)
      .createQueryBuilder('users')
      .innerJoin(OrganizationUser, 'organization_user', 'organization_user.user_id = users.id')
      .where('users.deleted_at IS NULL')
      .andWhere('organization_user.organization_id = :organization_id', { organization_id })
      .andWhere(`(users.create_by = ${create_by} OR users.id = ${create_by})`)
      .getCount()
  }

  public async countUserActive(options): Promise<number> {
    const { status = ACTIVE, create_by, organization_id } = options
    const connection = await this.db.getConnection()
    return connection
      .getCustomRepository(UserRepository)
      .createQueryBuilder('users')
      .innerJoin(OrganizationUser, 'organization_user', 'organization_user.user_id = users.id')
      .where('users.deleted_at IS NULL')
      .andWhere('users.status = :status', { status })
      .andWhere('organization_user.organization_id = :organization_id', { organization_id })
      .andWhere('users.create_by = :create_by', { create_by })
      .orWhere('users.id = :create_by', { create_by })
      .getCount()
  }
}

export default UserRepository
