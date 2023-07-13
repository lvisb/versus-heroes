import { TokenGuard } from '#common/guards/token.guard.js'
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { CharService } from './char.service.js'
import { HttpResponse } from '#common/utils/http-response.util.js'
import { CharNameDto } from './dtos/char-name.dto.js'
import { CharacterNotFoundException } from '#common/exceptions/character-not-found.exception.js'
import { CharacterAlreadyExists } from '#common/exceptions/character-already-exists.exception.js'

@Controller('api/v1/char')
@UseGuards(TokenGuard)
export class CharController {
  constructor(private readonly charService: CharService) {}

  @Get()
  async char(@Query() dto: CharNameDto) {
    const { name } = dto

    const { data } = await this.charService.findDbCharByName(name)

    if (data.length === 0) throw new CharacterNotFoundException()

    return HttpResponse.createBody({ charProfile: data[0] })
  }

  @Post()
  async createChar(@Body() dto: CharNameDto) {
    const { name } = dto

    const dbChar = await this.charService.findDbCharByName(name)

    if (dbChar.data.length > 0) throw new CharacterAlreadyExists()

    const aiChar = await this.charService.findAiCharByName(name)

    if(!aiChar) throw new CharacterNotFoundException()

    const profile = await this.charService.generateCharacterProfile(aiChar.characterName)

    return HttpResponse.createBody({
      ...profile,
    })
  }
}
