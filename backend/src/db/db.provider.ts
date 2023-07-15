import { DataSource } from 'typeorm'
import { dataSourceOptions } from './db.config.js'
import { ConfigService } from '#config/config.service.js'

export const Db = 'DbProvider'

export const TypeORMProvider: any = {
  provide: Db,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<any> => {
    const dataSource = new DataSource({ ...dataSourceOptions })

    return dataSource.initialize()
  },
}
