import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class newtables1630565669582 implements MigrationInterface {

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
                    isNullable: false,
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
                }
            ]
        }), true)

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
        await queryRunner.dropForeignKey('user', 'postIDs')
        await queryRunner.dropTable('user');
        await queryRunner.dropTable('post');
    }

}
