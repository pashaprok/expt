import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class citiesTable1630912121091 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'city',
            columns: [
                {
                    name: "id",
                    type: "int",
                    isNullable: false,
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: false,
                    length: "255",
                },
                {
                    name: "state",
                    type: "varchar",
                    isNullable: true,
                    length: "255",
                },
                {
                    name: "country",
                    type: "varchar",
                    isNullable: false,
                    length: "255",
                },
                {
                    name: "loncoord",
                    type: "double precision",
                    isNullable: false,
                },
                {
                    name: "latcoord",
                    type: "double precision",
                    isNullable: false,
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('city');
    }

}
