import {MigrationInterface, QueryRunner} from "typeorm";

export class blacklist11598823790122 implements MigrationInterface {
    name = 'blacklist11598823790122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usersInfo" ADD "blackList" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "productsInfo" ALTER COLUMN "price" SET DEFAULT null`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "productsInfo" ALTER COLUMN "price" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "usersInfo" DROP COLUMN "blackList"`);
    }

}
