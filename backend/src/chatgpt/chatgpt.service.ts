import { ChatGptClient } from '#chatgpt/chatgpt.provider.js'
import { Inject, Injectable } from '@nestjs/common'
import { ChatGPTAPI, SendMessageOptions } from 'chatgpt'
import slug from 'slug'
import { chatgpt } from '#common/types/chatgpt.types.js'
import {
  charAppearance,
  charAttributesPrompt,
  charExistsPrompt,
  charHistoryPrompt,
  charMainNamePrompt,
  charStrenghtsPrompt,
  charSummaryPrompt,
  charWeaknessesPrompt,
} from './prompts/char.prompt.js'

@Injectable()
export class ChatGptService {
  constructor(
    @Inject(ChatGptClient)
    private readonly openai: ChatGPTAPI,
  ) {}

  async charExists(charName: string) {
    const charExists = await this.openai.sendMessage(charExistsPrompt(charName))

    const promptResultJson = JSON.parse(charExists.text)

    const json: chatgpt.char.CharExists = {
      ...promptResultJson,
      conversationId: charExists.conversationId,
      id: charExists.id,
    }

    return json
  }

  async findMainName(charName: string, alsoKnown: string[]) {
    const promptResult = await this.openai.sendMessage(
      charMainNamePrompt([...charName, ...alsoKnown]),
    )

    const json: chatgpt.char.CharExists = {
      ...JSON.parse(promptResult.text),
      conversationId: promptResult.conversationId,
      id: promptResult.id,
    }

    return json
  }

  async charSummary(charName: string) {
    const summary = await this.openai.sendMessage(charSummaryPrompt(charName), {
      conversationId: slug(charName),
      completionParams: {
        temperature: 0.2,
      },
    })

    const json: chatgpt.char.Summary = {
      summary: JSON.parse(summary.text).summary,
      conversationId: summary.conversationId,
      id: summary.id,
    }

    return json
  }

  async charHistory(charName: string) {
    const promptResult = await this.openai.sendMessage(
      charHistoryPrompt(charName),
      {
        conversationId: slug(charName),
        completionParams: {
          temperature: 0.2,
        },
      },
    )

    const json: chatgpt.char.FullHistory = {
      history: promptResult.text,
      conversationId: promptResult.conversationId,
      id: promptResult.id,
    }

    return json
  }

  async charAppearance(charName: string) {
    const promptResult = await this.openai.sendMessage(
      charAppearance(charName),
      {
        conversationId: slug(charName),
        completionParams: {
          temperature: 0.2,
        },
      },
    )

    const json: chatgpt.char.Appearance = {
      appearance: promptResult.text,
      conversationId: promptResult.conversationId,
      id: promptResult.id,
    }

    return json
  }

  async charAttributes(messageOptions: SendMessageOptions) {
    const attributes = await this.openai.sendMessage(
      charAttributesPrompt,
      messageOptions,
    )

    const json: chatgpt.char.Attributes = JSON.parse(attributes.text)

    return json
  }

  async charStrenghts(messageOptions: SendMessageOptions) {
    const strengths = await this.openai.sendMessage(
      charStrenghtsPrompt,
      messageOptions,
    )

    const json: chatgpt.char.Strengths = JSON.parse(strengths.text).strengths

    return json
  }

  async charWeaknesses(messageOptions: SendMessageOptions) {
    const weaknesses = await this.openai.sendMessage(
      charWeaknessesPrompt,
      messageOptions,
    )

    const json: chatgpt.char.Weaknesses = JSON.parse(weaknesses.text).weaknesses

    return json
  }
}
