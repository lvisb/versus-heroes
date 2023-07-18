import { Strategy } from 'passport-local'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import supabase from '@supabase/supabase-js'
import { SupabaseService } from '#supabase/supabase.service.js'

export const SupabaseStrategyName = 'supabase'

@Injectable()
export class SupabaseStrategy extends PassportStrategy(
  Strategy,
  SupabaseStrategyName,
) {
  public constructor(private readonly supabaseService: SupabaseService) {
    super()
  }

  validate(
    email: string,
    password: string,
  ): Promise<supabase.AuthTokenResponse> {
    return this.supabaseService.client.auth.signInWithPassword({
      email,
      password,
    })
  }
}
