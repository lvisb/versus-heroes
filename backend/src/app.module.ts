import { ConfigModule } from './common/config/module.config.js'
import { Module } from '@nestjs/common'
import { DbModule } from './db/db.module.js'
import { AuthModule } from '#api/v1/auth/auth.module.js'

@Module({
  imports: [ConfigModule, DbModule, AuthModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
