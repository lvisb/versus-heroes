import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
import { CharIdDto } from './dtos/char-id.dto.js'
import { PaginationDto } from '#common/dtos/pagination.dto.js'

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

  @Get('list')
  async charList(
    @Req() req: SignedInRequest,
    @Query() pagination: PaginationDto,
  ) {
    const totalChars = await this.charService
      .findCharsByAuthorId(req.user.sub)
      .getCount()

    const chars = await this.charService
      .findCharsByAuthorId(req.user.sub)
      .select([
        'c.charId',
        'c.charName',
        'c.isActive',
        'c.createdAt',
        'c.updatedAt',
      ])
      .skip((pagination.currentPage - 1) * pagination.itemsPerPage)
      .take(pagination.itemsPerPage)
      .orderBy('c.createdAt', 'DESC')
      .getMany()

    return HttpResponse.createBody({
      chars,
      totalChars,
      currentPage: pagination.currentPage,
      itemsPerPage: pagination.itemsPerPage,
    })
  }

  @Delete(':id')
  async deleteChar(@Req() req: SignedInRequest, @Param() dto: CharIdDto) {
    const char = await this.charService
      .findCharById(dto.id, req.user.sub)
      .select(['c.charId'])
      .getOne()

    if (!char) throw new CharacterNotFoundException()

    await this.charService.deleteChar(char)

    return HttpResponse.createBody({})
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
