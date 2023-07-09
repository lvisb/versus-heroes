import { ChatGptClient } from '#chatgpt/chatgpt.provider.js'
import { Inject, Injectable } from '@nestjs/common'
import { ChatGPTAPI } from 'chatgpt'

@Injectable()
export class ChatGptService {
  constructor(
    @Inject(ChatGptClient)
    private readonly openai: ChatGPTAPI,
  ) {}
}
