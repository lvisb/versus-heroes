import { Controller, Get } from '@nestjs/common'
import { WebsiteService } from './website.service.js'
import { HttpResponse } from '#common/utils/http-response.util.js'

@Controller('api/v1/website')
export class WebsiteController {
  constructor(private readonly websiteService: WebsiteService) {}

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
