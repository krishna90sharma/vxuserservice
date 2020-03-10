import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUserTable1553616427867 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: "users",
      columns: [
        {
          name: "id",
          type: "int",
          isPrimary: true,
          isNullable: false,
          isGenerated: true,
          generationStrategy: "increment",
        },
        {
          name: "thumbnail_id",
          type: "int",
          isNullable: false,
        },
        {
          name: "first_name",
          type: "varchar",
          length: "255",
          isNullable: false
        },
        {
          name: "last_name",
          type: "varchar",
          length: "255",
          isNullable: false
        },
        {
          name: "email",
          type: "varchar",
          length: "255",
          isNullable: false
        },
        {
          name: "is_email_verified",
          type: "int",
          default: 0
        },
        {
          name: "password",
          type: "varchar",
          length: "255",
          isNullable: false
        },
        {
          name: "language",
          type: "varchar",
          length: "50"
        },
        {
          name: "status",
          type: "int",
          default: 0
        },
        {
          name: 'deleted_at',
          type: 'timestamp',
          isNullable: true,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
        }
      ]
    }), true)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("users");
  }
}
