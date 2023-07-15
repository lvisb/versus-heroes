import { Global, Module } from '@nestjs/common'
import { Db, TypeORMProvider } from './db.provider.js'
import { ConfigService } from '#config/config.service.js'
import { DbService } from './db.service.js'

@Global()
@Module({
  imports: [],
  providers: [TypeORMProvider, ConfigService, DbService],
  exports: [Db, DbService],
})
export class DbModule {}
