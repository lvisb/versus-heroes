import { SupabaseClient } from '#supabase/supabase.provider.js'
import { Inject, Injectable } from '@nestjs/common'
import supabase from '@supabase/supabase-js'
import { SignUpDto } from './dtos/sign-up.dto.js'

@Injectable()
export class SignUpService {
  constructor(
    @Inject(SupabaseClient)
    private readonly client: supabase.SupabaseClient,
  ) {}

  async emailAlreadyExists(email: string): Promise<boolean> {
    const r = await this.client.rpc('fn_email_exists', {
      email,
    })

    return r.data
  }

  createUser(dto: SignUpDto) {
    const { password, email, name } = dto

    return this.client.auth.admin.createUser({
      user_metadata: { role: 'user', name },
      password,
      email,
    })
  }

  inviteUserByEmail(email: string) {
    return this.client.auth.admin.inviteUserByEmail(email)
  }
}
