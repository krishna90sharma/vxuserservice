import { Connection, ConnectionManager, ConnectionOptions, createConnection, getConnectionManager, getConnection } from 'typeorm'
import Token from '../../api/v1/Auth/Entities/Token'
import Roles from '../../api/v1/Roles/Entities/Roles'
import Permissions from '../../api/v1/Permissions/Entities/Permissions'
import UserRole from '../../api/v1/Roles/Entities/UserRole'
import UserPermission from '../../api/v1/Permissions/Entities/UserPermission'
import Organizations from '../../api/v1/Organizations/Entities/Organizations'
import Thumbnails from '../../api/v1/Thumbnails/Entities/Thumbnails'
import OrganizationUser from '../../api/v1/Organizations/Entities/OrganizationUser'
import RolePermission from '../../api/v1/Permissions/Entities/RolePermission'
import OrganizationSetting from '../../api/v1/Organizations/Entities/OrganizationSetting'
import Address from '../../api/v1/Address/Entities/Address'
import AddressDetail from '../../api/v1/Address/Entities/AddressDetail'
import Phones from '../../api/v1/Phones/Entities/Phones'
import { PasswordResets, User } from '../../api/v1/Users/Entities'

/**
 * DatabaseConnect manager class
 */
export class DatabaseConnect {
  private connectionManager: ConnectionManager

  constructor() {
    this.connectionManager = getConnectionManager()
  }

  public async getConnection() {
    const CONNECTION_NAME = 'vxdatabase'

    let connection: Connection

    if (this.connectionManager.has(CONNECTION_NAME)) {
      console.log(`Database.getConnection()-using existing connection ...`)

      connection = await getConnection(CONNECTION_NAME)

      if (!connection.isConnected) {
        connection = await connection.connect()
      }
    } else {
      return await this.createConnection()
    }

    return connection
  }

  private async createConnection() {
    console.log(`Database.getConnection()-creating connection ...`)

    const connectionOptions: ConnectionOptions = {
      name: 'vxdatabase',
      type: 'postgres',
      port: 5432,
      synchronize: true,
      logging: true,
      host: process.env.TYPEORM_HOST,
      username: process.env.TYPEORM_USERNAME,
      database: process.env.TYPEORM_DATABASE,
      password: process.env.TYPEORM_PASSWORD,
      entities: [
        User,
        Token,
        Roles,
        Permissions,
        UserRole,
        UserPermission,
        Organizations,
        Thumbnails,
        OrganizationUser,
        RolePermission,
        OrganizationSetting,
        Address,
        AddressDetail,
        Phones,
        PasswordResets
      ],
    }

    let configConnection = {}
    switch (process.env.APP_ENV) {
      case 'stg': {
        configConnection = {
          host: process.env.TYPEORM_HOST_STG,
          username: process.env.TYPEORM_USERNAME_STG,
          database: process.env.TYPEORM_DATABASE_STG,
          password: process.env.TYPEORM_PASSWORD_STG,
        }
        break
      }
      case 'dev': {
        configConnection = {
          host: process.env.TYPEORM_HOST_DEV,
          username: process.env.TYPEORM_USERNAME_DEV,
          database: process.env.TYPEORM_DATABASE_DEV,
          password: process.env.TYPEORM_PASSWORD_DEV,
        }
        break
      }
      case 'prod': {
        configConnection = {
          host: process.env.TYPEORM_HOST_PROD,
          username: process.env.TYPEORM_USERNAME_PROD,
          database: process.env.TYPEORM_DATABASE_PROD,
          password: process.env.TYPEORM_PASSWORD_PROD,
        }
        break
      }
    }

    Object.assign(connectionOptions, configConnection)

    return await createConnection(connectionOptions)
  }
}
