import { Inject, Injectable } from '@nestjs/common'
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { Db } from './db.config.js'

@Injectable()
export class DbService {
  constructor(
    @Inject(Db) private readonly db: PostgresJsDatabase<Record<string, never>>,
  ) {}

  get client(): PostgresJsDatabase<Record<string, never>> {
    return this.db
  }
}
