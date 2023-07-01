import { Module } from '@nestjs/common'
import { AuthModule } from '#api/v1/auth/auth.module.js'
import { SignUpModule } from '#api/v1/sign-up/sign-up.module.js'
import { CharModule } from '#api/v1/char/char.module.js'
import { ConfigModule } from '#config/config.module.js'

@Module({
  imports: [ConfigModule, AuthModule, SignUpModule, CharModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
