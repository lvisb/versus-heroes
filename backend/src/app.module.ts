import { ConfigModule } from './common/config/module.config.js'
import { Module } from '@nestjs/common'
import { DbModule } from './db/db.module.js'

@Module({
  imports: [ConfigModule, DbModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
