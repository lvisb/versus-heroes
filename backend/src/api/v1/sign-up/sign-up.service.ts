import { Injectable } from '@nestjs/common'
import { SignUpDto } from './dtos/sign-up.dto.js'
import { SupabaseService } from '#supabase/supabase.service.js'

@Injectable()
export class SignUpService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async emailAlreadyExists(email: string): Promise<boolean> {
    const r = await this.supabaseService.client.rpc('fn_email_exists', {
      email,
    })

    return r.data
  }

  createUser(dto: SignUpDto) {
    const { password, email, name } = dto

    return this.supabaseService.client.auth.signUp({
      password,
      email,
      options: {
        data: {
          role: 'user',
          name,
        },
      },
    })
  }
}
