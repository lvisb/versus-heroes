import { Module } from '@nestjs/common'
import { CharController } from './char.controller.js'
import { CharService } from './char.service.js'
import { AuthModule } from '../auth/auth.module.js'
import { ChatgptModule } from '#chatgpt/chatgpt.module.js'

@Module({
  imports: [AuthModule, ChatgptModule],
  controllers: [CharController],
  providers: [CharService],
})
export class CharModule {}
