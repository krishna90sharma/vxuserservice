import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUserRoleTable1553706363903 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: "user_role",
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
          isNullable: false,
        },
        {
          name: "role_id",
          type: "int",
          isNullable: false,
        }
      ]
    }), true)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("user_role");
  }
}
