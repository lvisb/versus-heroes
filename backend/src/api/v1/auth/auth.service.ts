import { Injectable } from '@nestjs/common'
import { SignInDto } from './dtos/sign-in.dto.js'
import { SupabaseStrategy } from './strategies/supabase.strategy.js'

@Injectable()
export class AuthService {
  constructor(private readonly authStrategy: SupabaseStrategy) {}

  signIn(dto: SignInDto) {
    return this.authStrategy.validate(dto.email, dto.password)
  }
}
