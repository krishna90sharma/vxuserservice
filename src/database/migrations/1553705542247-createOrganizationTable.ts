import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createOrganizationTable1553705542247 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: "organizations",
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
          name: "name",
          type: "varchar",
          length: "255",
          isNullable: false
        },
        {
          name: "type",
          type: "int",
          default: 0
        },
        {
          name: "description",
          type: "text",
          isNullable: true
        },
        {
          name: "country",
          type: "varchar",
          length: "255",
          isNullable: true
        },
        {
          name: "address",
          type: "varchar",
          length: "255",
          isNullable: true
        },
        {
          name: "phone",
          type: "varchar",
          length: "100",
          isNullable: true
        },
        {
          name: "url",
          type: "varchar",
          length: "100",
          isNullable: true
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
    await queryRunner.dropTable("organizations");
  }
}
