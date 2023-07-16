import { ChatGptService } from '#chatgpt/chatgpt.service.js'
import { chatgpt } from '#common/types/chatgpt.types.js'
import { DbService } from '#db/db.service.js'
import { Character } from '#db/entities/character.entity.js'
import { DreamStudioService } from '#dreamstudio/dreamstudio.service.js'
import { SupabaseClient } from '#supabase/supabase.provider.js'
import { Inject, Injectable } from '@nestjs/common'
import supabase from '@supabase/supabase-js'
import slug from 'slug'
import { decode } from 'base64-arraybuffer'
import { CharacterImg } from '#db/entities/character_img.entity.js'

@Injectable()
export class CharService {
  constructor(
    private readonly dbService: DbService,
    private readonly chatGptService: ChatGptService,
    private readonly dreamStudioService: DreamStudioService,
    @Inject(SupabaseClient)
    private readonly supabaseClient: supabase.SupabaseClient,
  ) {}

  findDbCharByName(charName: string) {
    return this.dbService.charRepo
      .createQueryBuilder('c')
      .where('c.charNameSlug = :charName', {
        charName: slug(charName)
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
    char.charNameSlug = slug(characterName)
    char.summary = summary.summary
    char.history = history
    char.appearance = appearance
    char.attributes = attributes
    char.strengths = strengths.strengths
    char.weaknesses = weaknesses.weaknesses
    char.charType = summary.type
    char.alsoKnownAs = alsoKnown
    char.profileImageSrc = char.charNameSlug + '.jpg'

    if (!(await this.characterImageExists(char.charName))) {
      const image = await this.generateCharacterImage(appearance)

      await this.uploadCharacterImage(char, image.base64)
      await this.saveCharacterImage(char)
    }

    return char
  }

  async characterImageExists(charName: string) {
    const img = await this.dbService.charImageRepo.findOne({
      where: { charNameSlug: slug(charName) },
    })

    return !!img
  }

  generateCharacterImage(characterDescription: string) {
    return this.dreamStudioService.generateCharacterImage(characterDescription)
  }

  saveCharacter(char: Character) {
    return this.dbService.charRepo.save(char)
  }

  saveCharacterImage(char: Character) {
    const img = new CharacterImg()

    img.charNameSlug = char.charNameSlug
    img.imagePath = char.profileImageSrc

    return this.dbService.charImageRepo.save(img)
  }

  async uploadCharacterImage(char: Character, base64Image: string) {
    const { error } = await this.supabaseClient.storage
      .from('characters')
      .upload(`public/${char.profileImageSrc}`, decode(base64Image), {
        contentType: 'image/jpeg',
      })

    if (error) console.error(error)
  }
}
