import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createTokenTable1553706167095 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: "tokens",
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
          name: "user_id",
          type: "int",
          isNullable: false
        },
        {
          name: "token_type",
          type: "varchar",
          length: "255",
          isNullable: false
        },
        {
          name: "access_token",
          type: "varchar",
          length: "255",
          isNullable: false
        },
        {
          name: "refresh_token",
          type: "varchar",
          length: "255",
          isNullable: true
        },
        {
          name: "user_agent",
          type: "varchar",
          length: "255",
          isNullable: true
        },
        {
          name: "location",
          type: "varchar",
          length: "255",
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
    await queryRunner.dropTable("tokens");
  }

}
