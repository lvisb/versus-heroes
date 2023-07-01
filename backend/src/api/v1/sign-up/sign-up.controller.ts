import { Body, Controller, Post } from '@nestjs/common'
import { SignUpDto } from './dtos/sign-up.dto.js'
import { SignUpService } from './sign-up.service.js'
import { EmailAlreadyExistsException } from '#common/exceptions/email-already-exists.exception.js'
import { HttpResponse } from '#common/utils/http-response.util.js'

@Controller('api/v1/sign-up')
export class SignUpController {
  constructor(private readonly service: SignUpService) {}

  @Post()
  async signUp(@Body() dto: SignUpDto) {
    const { email } = dto

    if (await this.service.emailAlreadyExists(email))
      throw new EmailAlreadyExistsException()

    await this.service.createUser(dto)

    await this.service.inviteUserByEmail(email)

    return HttpResponse.createBody({})
  }
}
