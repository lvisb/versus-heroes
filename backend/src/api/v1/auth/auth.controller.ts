import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service.js'
import { SignInDto } from './dtos/sign-in.dto.js'
import { HttpResponse } from '#common/utils/http-response.util.js'
import { SupabaseAuthException } from '#common/exceptions/invalid-crdentials.exception.js'
import { TokenGuard } from './guards/token.guard.js'
import { ForgotPasswordDto } from './dtos/forgot-password.dto.js'
import { EmailNotFoundException } from '#common/exceptions/email-not-found.exception.js'

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

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

  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    if (!(await this.authService.emailExists(dto.email)))
      throw new EmailNotFoundException()

    const { error } = await this.authService.passwordResetRequest(
      dto.email,
    )

    if (error) throw new SupabaseAuthException(error.message, error.status)

    return HttpResponse.createBody({})
  }
}
