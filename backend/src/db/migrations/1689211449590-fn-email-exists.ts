import { db } from '#db/db.consts.js'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class FnEmailExists1689211449590 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION ${db.functions.emailExists}(email VARCHAR)
      RETURNS BOOLEAN SECURITY definer AS
      $$
      BEGIN
        RETURN EXISTS(SELECT 1 FROM auth.users WHERE LOWER(auth.users.email) = LOWER($1));
      END;
      $$ LANGUAGE plpgsql;
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP FUNCTION IF EXISTS ${db.functions.emailExists}(email VARCHAR);
    `)
  }
}
