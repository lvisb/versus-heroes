import { ChatGptService } from '#chatgpt/chatgpt.service.js'
import { chatgpt } from '#common/types/chatgpt.types.js'
import { DbService } from '#db/db.service.js'
import { Character } from '#db/entities/character.entity.js'
import {
  DreamStudioResponseArtifact,
  DreamStudioService,
} from '#dreamstudio/dreamstudio.service.js'
import { Injectable } from '@nestjs/common'
import slug from 'slug'
import { decode } from 'base64-arraybuffer'
import { CharacterImg } from '#db/entities/character_img.entity.js'
import { nanoid } from 'nanoid'
import { SupabaseService } from '#supabase/supabase.service.js'
import { CharPutDto } from './dtos/put.dto.js'

@Injectable()
export class CharService {
  constructor(
    private readonly dbService: DbService,
    private readonly chatGptService: ChatGptService,
    private readonly dreamStudioService: DreamStudioService,
    private readonly supabaseService: SupabaseService,
  ) {}

  findCharById(charId: string, authorId: string) {
    return this.dbService.charRepo
      .createQueryBuilder('c')
      .innerJoinAndSelect('c.profileImageId', 'profileImage')
      .innerJoinAndSelect('c.images', 'images')
      .where({
        charId,
        authorId,
      })
  }

  findDbCharByName(charName: string) {
    return this.dbService.charRepo
      .createQueryBuilder('c')
      .where('c.charNameSlug = :charName', {
        charName: slug(charName),
      })
  }

  deleteChar(char: Character) {
    return this.dbService.charRepo.softRemove(char)
  }

  findCharsByAuthorId(authorId: string) {
    return this.dbService.charRepo.createQueryBuilder('c').where({
      authorId,
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

    return char
  }

  async generateCharacterImages(char: Character) {
    const imageStyles: string[] = [
      'isometric',
      'analog-film',
      'modeling-compound',
    ]
    const imagesIds: string[] = []
    const images: DreamStudioResponseArtifact[] = []

    for (const style of imageStyles) {
      images.push(
        await this.dreamStudioService.generateCharacterImage(
          char.appearance,
          style,
        ),
      )
    }

    for (const [_, image] of images.entries()) {
      const fileName = `${char.charNameSlug}-${nanoid(6)}.jpg`

      await this.uploadCharacterImage(fileName, image.base64)

      const dbImage = await this.saveCharacterImage(char, fileName)

      imagesIds.push(dbImage.imageId)
    }

    char.profileImageId =
      imagesIds[Math.floor(Math.random() * imagesIds.length)]

    await this.saveCharacter(char)

    return char
  }

  saveCharacter(char: Character) {
    return this.dbService.charRepo.save(char)
  }

  saveCharacterImage(char: Character, fileName: string) {
    const img = new CharacterImg()

    img.characterId = char.charId
    img.imagePath = fileName

    return this.dbService.charImageRepo.save(img)
  }

  updateCharacter(authorId: string, charId: string, dto: CharPutDto) {
    return this.dbService.db
      .createQueryBuilder()
      .update(Character)
      .set(dto)
      .where({ charId, authorId })
  }

  async uploadCharacterImage(fileName: string, base64Image: string) {
    const { error } = await this.supabaseService.client.storage
      .from('characters')
      .upload(`public/${fileName}`, decode(base64Image), {
        contentType: 'image/jpeg',
      })

    if (error) console.error(error)
  }
}
