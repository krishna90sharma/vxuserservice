import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createPermissionTable1553706582448 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.createTable(new Table({
        name: "permissions",
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
            name: "name",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "display_name",
            type: "varchar",
            length: "255",
            isNullable: false
          },
          {
            name: "description",
            type: "text",
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
      await queryRunner.dropTable("permissions");
    }

}
