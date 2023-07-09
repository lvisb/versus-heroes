import { ChatGptClient } from '#chatgpt/chatgpt.provider.js'
import { Inject, Injectable } from '@nestjs/common'
import { ChatGPTAPI } from 'chatgpt'
import { summaryPrompt } from './prompts/summary.prompt.js'
import { attributesPrompt } from './prompts/attributes.prompt.js'
import { strenghtsPrompt } from './prompts/strenghts.prompt.js'
import { weaknessesPrompt } from './prompts/weaknesses.prompt.js'

@Injectable()
export class ChatGptService {
  constructor(
    @Inject(ChatGptClient)
    private readonly openai: ChatGPTAPI,
  ) {}

  async charSummary(charName: string) {
    const summary = await this.openai.sendMessage(summaryPrompt(charName), {
      completionParams: {
        temperature: 0.2,
      },
    })

    return summary
  }

  async charAttributes(parentMessageId: string) {
    const attributes = await this.openai.sendMessage(attributesPrompt, {
      parentMessageId,
    })

    return attributes
  }

  async charStrenghts(parentMessageId: string) {
    const strengths = await this.openai.sendMessage(strenghtsPrompt, {
      parentMessageId,
    })

    return strengths
  }

  async charWeaknesses(parentMessageId: string) {
    const weaknesses = await this.openai.sendMessage(weaknessesPrompt, {
      parentMessageId,
    })

    return weaknesses
  }
}
