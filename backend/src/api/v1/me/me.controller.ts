import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { TokenGuard } from '../auth/guards/token.guard.js'
import { SignedInRequest } from '#common/types/signed-in-request.type.js'
import { HttpResponse } from '#common/utils/http-response.util.js'

@UseGuards(TokenGuard)
@Controller('api/v1/me')
export class MeController {
  @Get()
  async me(@Req() req: SignedInRequest) {
    return HttpResponse.createBody({
      user: {
        id: req.user.sub,
        email: req.user.email,
      },
    })
  }
}
