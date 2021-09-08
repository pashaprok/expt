import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class addcitiestousers1630929597355 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("user", new TableColumn({
            name: "cityID",
            type: "int",
            isNullable: false
        }));

        await queryRunner.createForeignKey("user", new TableForeignKey({
            columnNames: ["cityID"],
            referencedColumnNames: ["id"],
            referencedTableName: "city",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("user", "cityID");
    }

}