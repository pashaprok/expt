import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class addUserTable1631175537823 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user',
            columns: [
                {
                    name: "id",
                    type: "serial",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: true,
                    length: "255",
                },
                {
                    name: "email",
                    type: "varchar",
                    isNullable: false,
                    length: "255",
                },
                {
                    name: "password",
                    type: "varchar",
                    isNullable: false,
                    length: "255",
                },
                {
                    name: "cityID",
                    type: "int",
                    isNullable: false
                }
            ]
        }), true)

        await queryRunner.createForeignKey("user", new TableForeignKey({
            columnNames: ["cityID"],
            referencedColumnNames: ["id"],
            referencedTableName: "city",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("user", "cityID");
        await queryRunner.dropTable('user');
    }

}
