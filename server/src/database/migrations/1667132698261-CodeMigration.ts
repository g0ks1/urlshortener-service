import { MigrationInterface, QueryRunner } from 'typeorm';

export class CodeMigration1667132698261 implements MigrationInterface {
  name = 'CodeMigration1667132698261';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`code\` (\`id\` bigint NOT NULL, \`shortcode_uuid\` varchar(255) NULL, \`redirect_url\` varchar(1000) NOT NULL, \`active\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_04e4cd030795ebf3563a3eab6c\` (\`shortcode_uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_04e4cd030795ebf3563a3eab6c\` ON \`code\``,
    );
    await queryRunner.query(`DROP TABLE \`code\``);
  }
}
