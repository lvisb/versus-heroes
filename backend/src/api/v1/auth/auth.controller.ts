import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service.js'
import { SignInDto } from './dtos/sign-in.dto.js'
import { HttpResponse } from '#common/utils/http-response.util.js'
import { SupabaseAuthException } from '#common/exceptions/invalid-crdentials.exception.js'
import { TokenGuard } from './guards/token.guard.js'

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() dto: SignInDto) {
    const { data, error } = await this.authService.signIn(dto)

    if (error) throw new SupabaseAuthException(error.message, error.status)

    return HttpResponse.createBody({
      token: data.session.access_token,
    })
  }

  @UseGuards(TokenGuard)
  @Post('validate-token')
  async validateToken() {
    return HttpResponse.createBody({})
  }
}
