import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createOrganizationUserTable1553705801820 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: "organization_user",
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
          name: "organization_id",
          type: "int",
          isNullable: false,
        },
        {
          name: "user_id",
          type: "int",
          isNullable: false,
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
    await queryRunner.dropTable("organization_user");
  }
}
