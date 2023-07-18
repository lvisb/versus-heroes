import { Module } from '@nestjs/common'
import { AuthModule } from '#api/v1/auth/auth.module.js'
import { SignUpModule } from '#api/v1/sign-up/sign-up.module.js'
import { CharModule } from '#api/v1/char/char.module.js'
import { ConfigModule } from '#config/config.module.js'
import { ChatgptModule } from '#chatgpt/chatgpt.module.js'
import { DbModule } from '#db/db.module.js'
import { DreamstudioModule } from './dreamstudio/dreamstudio.module.js'
import { MeModule } from './api/v1/me/me.module.js'

@Module({
  imports: [
    ConfigModule,
    DbModule,
    AuthModule,
    SignUpModule,
    CharModule,
    ChatgptModule,
    DreamstudioModule,
    MeModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
