import { Injectable } from '@nestjs/common'
import { SupabaseStrategy } from './auth.stragegy.js'
import { SignInDto } from './dtos/sign-in.dto.js'

@Injectable()
export class AuthService {
  constructor(private readonly authStrategy: SupabaseStrategy) {}

  signIn(dto: SignInDto) {
    return this.authStrategy.validate(dto.email, dto.password)
  }
}
