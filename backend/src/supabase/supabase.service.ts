import { Inject, Injectable } from '@nestjs/common'
import supabase from '@supabase/supabase-js'
import { SupabaseClient } from './supabase.provider.js'

@Injectable()
export class SupabaseService {
  constructor(
    @Inject(SupabaseClient)
    public readonly client: supabase.SupabaseClient,
  ) {}
}
