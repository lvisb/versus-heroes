import { ConfigModule } from './common/config/module.config.js'
import { Module } from '@nestjs/common'
import { AuthModule } from '#api/v1/auth/auth.module.js'
import { SignUpModule } from '#api/v1/sign-up/sign-up.module.js'

@Module({
  imports: [ConfigModule, AuthModule, SignUpModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
