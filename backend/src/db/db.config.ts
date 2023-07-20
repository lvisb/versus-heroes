import { DataSource, DataSourceOptions } from 'typeorm'
import { Character } from './entities/character.entity.js'
import { FnEmailExists1689211449590 } from './migrations/1689211449590-fn-email-exists.js'
import { CharacterImg } from './entities/character_img.entity.js'
import { User } from './entities/auth.user.entity.js'

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User, Character, CharacterImg],
  synchronize: false,
  migrationsTableName: '_typeorm_migrations',
  migrations: [FnEmailExists1689211449590],
  migrationsTransactionMode: 'each',
  logging: process.env.NODE_ENV === 'production' ? ['error', 'warn'] : 'all',
}

export default new DataSource(dataSourceOptions)
