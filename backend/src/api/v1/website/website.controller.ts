import { Controller, Get, Param } from '@nestjs/common'
import { WebsiteService } from './website.service.js'
import { HttpResponse } from '#common/utils/http-response.util.js'
import { SlugDto } from './dtos/slug.dto.js'
import { CharacterNotFoundException } from '#common/exceptions/character-not-found.exception.js'

@Controller('api/v1/website')
export class WebsiteController {
  constructor(private readonly websiteService: WebsiteService) {}

  @Get('char/:slug')
  async char(@Param() dto: SlugDto) {
    const r = await this.websiteService.findCharByUrlSlug(dto.slug).getOne()

    if (!r) throw new CharacterNotFoundException()

    return HttpResponse.createBody({ char: r })
  }

  @Get('chars')
  async chars() {
    const r = await this.websiteService
      .chars()
      .select(['c.charName', 'c.charNameSlug', 'profileImage.imagePath'])
      .getMany()

    return HttpResponse.createBody({
      chars: r,
    })
  }
}
