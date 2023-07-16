import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { CharService } from './char.service.js'
import { HttpResponse } from '#common/utils/http-response.util.js'
import { CharNameDto } from './dtos/char-name.dto.js'
import { CharacterNotFoundException } from '#common/exceptions/character-not-found.exception.js'
import { CharacterAlreadyExists } from '#common/exceptions/character-already-exists.exception.js'
import { TokenGuard } from '../auth/guards/token.guard.js'
import { SignedInRequest } from '#common/types/signed-in-request.type.js'

@UseGuards(TokenGuard)
@Controller('api/v1/char')
export class CharController {
  constructor(private readonly charService: CharService) {}

  @Get()
  async char(@Query() dto: CharNameDto) {
    const { name } = dto

    const char = await this.charService.findDbCharByName(name).getOne()

    if (!char) throw new CharacterNotFoundException()

    return HttpResponse.createBody({ charProfile: char })
  }

  @Post()
  async createChar(@Req() req: SignedInRequest, @Body() dto: CharNameDto) {
    const { name } = dto

    const aiChar = await this.charService.findAiCharByName(name)

    if (!aiChar) throw new CharacterNotFoundException()

    const dbChar = await this.charService
      .findDbCharByName(aiChar.characterName)
      .select(['c.charName', 'c.charId'])
      .getOne()

    if (dbChar) throw new CharacterAlreadyExists()

    const char = await this.charService.generateCharacterProfile(aiChar)

    char.authorId = req.user.sub

    await this.charService.saveCharacter(char)

    return HttpResponse.createBody({})
  }
}
