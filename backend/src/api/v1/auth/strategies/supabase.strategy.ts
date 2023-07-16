import { Strategy } from 'passport-local'
import { SupabaseClient } from '#supabase/supabase.provider.js'
import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import supabase from '@supabase/supabase-js'

export const SupabaseStrategyName = 'supabase'

@Injectable()
export class SupabaseStrategy extends PassportStrategy(
  Strategy,
  SupabaseStrategyName,
) {
  public constructor(
    @Inject(SupabaseClient)
    private readonly client: supabase.SupabaseClient<any, 'public', any>,
  ) {
    super()
  }

  validate(
    email: string,
    password: string,
  ): Promise<supabase.AuthTokenResponse> {
    return this.client.auth.signInWithPassword({
      email,
      password,
    })
  }
}
