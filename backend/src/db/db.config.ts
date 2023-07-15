import { DataSource, DataSourceOptions } from 'typeorm'
import { Character } from './entities/character.entity.js'
import { FnEmailExists1689211449590 } from './migrations/1689211449590-fn-email-exists.js'

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Character],
  synchronize: false,
  migrationsTableName: '_typeorm_migrations',
  migrations: [FnEmailExists1689211449590],
  migrationsTransactionMode: 'each',
  logging: 'all',
}

export default new DataSource(dataSourceOptions)
