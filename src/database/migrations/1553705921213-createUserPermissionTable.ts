import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUserPermissionTable1553705921213 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: "user_permissions",
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
          name: "permission_id",
          type: "int",
          isNullable: false,
        }
      ]
    }), true)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("user_permissions");
  }
}
