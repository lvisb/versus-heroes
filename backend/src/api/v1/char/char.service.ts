import { ChatGptService } from '#chatgpt/chatgpt.service.js'
import { SupabaseClient } from '#supabase/supabase.provider.js'
import { Inject, Injectable } from '@nestjs/common'
import supabase from '@supabase/supabase-js'

@Injectable()
export class CharService {
  constructor(
    @Inject(SupabaseClient)
    private readonly subabaseClient: supabase.SupabaseClient,
    private readonly chatGptService: ChatGptService,
  ) {}

  findDbCharByName(name: string) {
    return this.subabaseClient
      .from('characters')
      .select('*')
      .like('name', name)
      .limit(1)
  }

  async findAiCharByName(name: string) {
    const char = await this.chatGptService.charExists(name)

    if(!char.characterName) return null

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
