import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createRolePermissionTable1553706624214 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.createTable(new Table({
        name: "role_permission",
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
            name: "role_id",
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
      await queryRunner.dropTable("role_permission");
    }

}
