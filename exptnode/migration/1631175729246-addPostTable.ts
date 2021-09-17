import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class addPostTable1631175729246 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'post',
            columns: [
                {
                    name: "id",
                    type: "serial",
                    isPrimary: true
                },
                {
                    name: "title",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: 'content',
                    type: 'varchar'
                },
                {
                    name: 'posted',
                    type: 'timestamp without time zone'
                },
                {
                    name: 'userID',
                    type: 'int',
                }

            ]
        }), true)

        await queryRunner.createForeignKey("post", new TableForeignKey({
            columnNames: ["userID"],
            referencedColumnNames: ["id"],
            referencedTableName: "user",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('post', 'userID')
        await queryRunner.dropTable('post');
    }

}
