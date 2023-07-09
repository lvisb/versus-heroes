import { TokenGuard } from '#common/guards/token.guard.js'
import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { CharService } from './char.service.js'
import { HttpResponse } from '#common/utils/http-response.util.js'
import { CharacterAlreadyExists } from '#common/exceptions/character-already-exists.exception.js'
import { CharNameDto } from './dtos/char-name.dto.js'

@Controller('api/v1/char')
@UseGuards(TokenGuard)
export class CharController {
  constructor(private readonly charService: CharService) {}

  private async checkCharName(name: string) {
    const { data } = await this.charService.findCharByName(name)

    if (data.length > 0) throw new CharacterAlreadyExists()

    return data
  }

  @Get('exists')
  async charExists(@Query() dto: CharNameDto) {
    const { name } = dto

    await this.checkCharName(name)

    return HttpResponse.createBody({})
  }
}
