import { ConfigService } from '#common/services/config.service.js'
import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

export const Db = 'DbProvider'

export const DrizzleProvider: any = {
  provide: Db,
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<PostgresJsDatabase<Record<string, never>>> => {
    const sql = postgres(configService.DATABASE_URL, {
      max: 5,
    })

    const client = drizzle(sql)

    return client
  },
}
