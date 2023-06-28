import { ConfigService } from '#common/services/config.service.js'
import { Global, Module } from '@nestjs/common'
import { Db, DrizzleProvider } from './db.config.js'

@Global()
@Module({
  imports: [],
  providers: [DrizzleProvider, ConfigService],
  exports: [Db],
})
export class DbModule {}
