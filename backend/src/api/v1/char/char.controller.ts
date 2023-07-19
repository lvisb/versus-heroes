import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
import { CharPutDto } from './dtos/put.dto.js'

@UseGuards(TokenGuard)
@Controller('api/v1/char')
export class CharController {
  constructor(private readonly charService: CharService) {}

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
      .select('c.charId', 'id')
      .addSelect('c.charName', 'charName')
      .addSelect('c.isActive', 'isActive')
      .addSelect('c.createdAt', 'createdAt')
      .addSelect('c.updatedAt', 'updatedAt')
      .skip((pagination.currentPage - 1) * pagination.itemsPerPage)
      .take(pagination.itemsPerPage)
      .orderBy('c.createdAt', 'DESC')
      .getRawMany()

    return HttpResponse.createBody({
      chars,
      totalChars,
      currentPage: pagination.currentPage,
      itemsPerPage: pagination.itemsPerPage,
    })
  }

  @Get(':id')
  async char(@Req() req: SignedInRequest, @Param() dto: CharIdDto) {
    const char = await this.charService
      .findCharById(dto.id, req.user.sub)
      .getOne()

    if (!char) throw new CharacterNotFoundException()

    return HttpResponse.createBody({
      char: {
        ...char,
        profileImageId: (char.profileImageId as any).imageId,
      },
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

  @Put(':id')
  async updateChar(
    @Req() req: SignedInRequest,
    @Param() dto: CharIdDto,
    @Body() body: CharPutDto,
  ) {
    const r = await this.charService
      .updateCharacter(req.user.sub, dto.id, body)
      .execute()

    if (r.affected === 0) throw new CharacterNotFoundException()

    return HttpResponse.createBody({})
  }

  @Post()
  async createChar(@Req() req: SignedInRequest, @Body() dto: CharNameDto) {
    const { name } = dto

    await this.charService.checkUserLimits(req.user.sub)

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

    await this.charService.generateCharacterImages(char)

    return HttpResponse.createBody({})
  }
}
