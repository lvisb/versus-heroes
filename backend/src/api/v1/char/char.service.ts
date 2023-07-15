import { ChatGptService } from '#chatgpt/chatgpt.service.js'
import { chatgpt } from '#common/types/chatgpt.types.js'
import { DbService } from '#db/db.service.js'
import { Character } from '#db/entities/character.entity.js'
import { DreamStudioService } from '#dreamstudio/dreamstudio.service.js'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CharService {
  constructor(
    private readonly dbService: DbService,
    private readonly chatGptService: ChatGptService,
    private readonly dreamStudioService: DreamStudioService,
  ) {}

  findDbCharByName(charName: string) {
    return this.dbService.charRepo
      .createQueryBuilder('c')
      .where('LOWER(c.char_name) = :charName', {
        charName: charName.trim().toLowerCase(),
      })
  }

  async findAiCharByName(name: string): Promise<chatgpt.char.Char> {
    const char = await this.chatGptService.charExists(name)

    if (!char.characterName) return null

    char.alsoKnown = (
      await this.chatGptService.charAlsoKnowAs(char.characterName)
    ).alsoKnown

    if (char.alsoKnown?.length > 0) {
      const mainChar = await this.chatGptService.findMainName(
        char.characterName,
        char.alsoKnown,
      )

      return mainChar
    }

    return char
  }

  async generateCharacterProfile(gptchar: chatgpt.char.Char) {
    const { characterName, alsoKnown } = gptchar

    const summary = await this.chatGptService.charSummary(characterName)

    const { history } = await this.chatGptService.charHistory(characterName)

    const { appearance } = await this.chatGptService.charAppearance(
      characterName,
    )

    const image = await this.generateCharacterImage(appearance)

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

    const char = new Character()

    char.charName = characterName
    char.summary = summary.summary
    char.history = history
    char.appearance = appearance
    char.attributes = attributes
    char.strengths = strengths.strengths
    char.weaknesses = weaknesses.weaknesses
    char.charType = summary.type
    char.alsoKnownAs = alsoKnown
    char.profileImageSrc = ''

    return char
  }

  generateCharacterImage(characterDescription: string) {
    return this.dreamStudioService.generateCharacterImage(characterDescription)
  }

  saveCharacter(char: Character) {
    return this.dbService.charRepo.save(char)
  }
}
