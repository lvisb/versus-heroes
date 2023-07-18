import { Injectable } from '@nestjs/common'
import { SignInDto } from './dtos/sign-in.dto.js'
import { SupabaseStrategy } from './strategies/supabase.strategy.js'
import { SupabaseService } from '#supabase/supabase.service.js'

@Injectable()
export class AuthService {
  constructor(private readonly authStrategy: SupabaseStrategy) {}
  constructor(
    private readonly authStrategy: SupabaseStrategy,
    private readonly supabaseService: SupabaseService,
  ) { }

  signIn(dto: SignInDto) {
    return this.authStrategy.validate(dto.email, dto.password)
  }

  async emailExists(email: string): Promise<boolean> {
    const r = await this.supabaseService.client.rpc('fn_email_exists', {
      email,
    })

    return !!r
  }

  passwordResetRequest(email: string) {
    return this.supabaseService.client.auth.resetPasswordForEmail(email, {
      redirectTo: `${this.configService.ADMIN_FRONTEND_URL}/forgot-password`,
    })
  }
}
