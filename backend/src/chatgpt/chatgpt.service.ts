import { ChatGptClient } from '#chatgpt/chatgpt.provider.js'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { ChatGPTAPI, SendMessageOptions } from 'chatgpt'
import slug from 'slug'
import { chatgpt } from '#common/types/chatgpt.types.js'
import {
  charAppearance,
  charAttributesPrompt,
  charExistsPrompt,
  charHistoryPrompt,
  charKnownByAnotherNamePrompt,
  charMainNamePrompt,
  charStrenghtsPrompt,
  charSummaryPrompt,
  charWeaknessesPrompt,
} from './prompts/char.prompt.js'
import { randomUUID } from 'crypto'

@Injectable()
export class ChatGptService {
  private readonly logger = new Logger(ChatGptService.name)

  constructor(
    @Inject(ChatGptClient)
    private readonly openai: ChatGPTAPI,
  ) {}

  async charExists(charName: string) {
    const charExists = await this.openai.sendMessage(charExistsPrompt(charName))

    this.logger.log(charExists.text, 'charExists')

    const promptResultJson = JSON.parse(charExists.text)

    const json: chatgpt.char.Char = {
      ...promptResultJson,
      id: charExists.id,
    }

    return json
  }

  async charAlsoKnowAs(charName: string) {
    const promptResult = await this.openai.sendMessage(
      charKnownByAnotherNamePrompt(charName),
    )

    this.logger.log(promptResult.text, 'charAlsoKnowAs')

    const json: chatgpt.char.Char = {
      alsoKnown: promptResult.text.split('; '),
      characterName: charName,
    }

    return json
  }

  async findMainName(charName: string, alsoKnown: string[]) {
    const promptResult = await this.openai.sendMessage(
      charMainNamePrompt([...charName, ...alsoKnown]),
    )

    this.logger.log(promptResult.text, 'findMainName')

    const json: chatgpt.char.Char = {
      characterName: promptResult.text,
      alsoKnown,
    }

    return json
  }

  async charSummary(charName: string) {
    const summary = await this.openai.sendMessage(charSummaryPrompt(charName), {
      conversationId: slug(charName) + '-' + randomUUID(),
      completionParams: {
        temperature: 0.2,
      },
    })

    this.logger.log(summary.text, 'charSummary')

    const parsedJson = JSON.parse(summary.text)

    const json: chatgpt.char.Summary = {
      summary: parsedJson.summary,
      type: parsedJson.char_type.toLowerCase(),
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

    this.logger.log(promptResult.text, 'charHistory')

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

    this.logger.log(promptResult.text, 'charAppearance')

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

    this.logger.log(attributes.text, 'charAttributes')

    const json: chatgpt.char.Attributes = JSON.parse(attributes.text)

    return json
  }

  async charStrenghts(messageOptions: SendMessageOptions) {
    const strengths = await this.openai.sendMessage(
      charStrenghtsPrompt,
      messageOptions,
    )

    this.logger.log(strengths.text, 'charStrenghts')

    const json: chatgpt.char.Strengths = JSON.parse(strengths.text)

    return json
  }

  async charWeaknesses(messageOptions: SendMessageOptions) {
    const weaknesses = await this.openai.sendMessage(
      charWeaknessesPrompt,
      messageOptions,
    )

    this.logger.log(weaknesses.text, 'charWeaknesses')

    const json: chatgpt.char.Weaknesses = JSON.parse(weaknesses.text)

    return json
  }
}
