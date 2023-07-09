import { SupabaseClient } from '#supabase/supabase.provider.js'
import { Inject, Injectable } from '@nestjs/common'
import supabase from '@supabase/supabase-js'

@Injectable()
export class CharService {
  constructor(
    @Inject(SupabaseClient)
    private readonly subabaseClient: supabase.SupabaseClient,
  ) {}

  findCharByName(name: string) {
    return this.subabaseClient
      .from('characters')
      .select('*')
      .like('name', name)
      .limit(1)
  }
}
