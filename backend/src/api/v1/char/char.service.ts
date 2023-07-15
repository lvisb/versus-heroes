import { ChatGptService } from '#chatgpt/chatgpt.service.js'
import { DbService } from '#db/db.service.js'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CharService {
  constructor(
    private readonly dbService: DbService,
    private readonly chatGptService: ChatGptService,
  ) {}

  findDbCharByName(charName: string) {
    return this.dbService.charRepo
      .createQueryBuilder('c')
      .where('LOWER(c.char_name) = :charName', {
        charName: charName.trim().toLowerCase(),
      })
  }

  async findAiCharByName(name: string) {
    const char = await this.chatGptService.charExists(name)

    if (!char.characterName) return null

    if (char.alsoKnown?.length > 0) {
      const mainChar = await this.chatGptService.findMainName(
        char.characterName,
        char.alsoKnown,
      )

      return mainChar
    }

    return char
  }

  async generateCharacterProfile(charName: string) {
    const summary = await this.chatGptService.charSummary(charName)

    const { history } = await this.chatGptService.charHistory(charName)

    const { appearance } = await this.chatGptService.charAppearance(charName)

    const attributes = await this.chatGptService.charAttributes({
      conversationId: summary.conversationId,
      parentMessageId: summary.id,
    })

    const strengths = await this.chatGptService.charStrenghts({
      conversationId: summary.conversationId,
      parentMessageId: summary.id,
    })

    const weaknesses = await this.chatGptService.charWeaknesses({
      conversationId: summary.conversationId,
      parentMessageId: summary.id,
    })

    return {
      summary: summary.summary,
      history,
      appearance,
      attributes,
      strengths,
      weaknesses,
    }
  }
}
