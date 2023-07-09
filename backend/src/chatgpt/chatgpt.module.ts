import { ConfigModule } from '#config/config.module.js'
import { Module } from '@nestjs/common'
import { ChatGptClient, ChatGptClientProvider } from './chatgpt.provider.js'
import { ChatGptService } from './chatgpt.service.js'

@Module({
  imports: [ConfigModule],
  providers: [ChatGptClientProvider, ChatGptService],
  exports: [ChatGptClient, ChatGptService],
})
export class ChatgptModule {}
