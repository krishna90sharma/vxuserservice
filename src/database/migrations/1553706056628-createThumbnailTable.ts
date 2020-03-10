import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createThumbnailTable1553706056628 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: "thumbnails",
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
          isNullable: false
        },
        {
          name: "type",
          type: "int",
          default: 0
        },
        {
          name: "format",
          type: "varchar",
          length: "255",
          isNullable: true
        },
        {
          name: "size",
          type: "varchar",
          length: "255",
          isNullable: true
        },
        {
          name: "path",
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
    await queryRunner.dropTable("thumbnails");
  }
}
