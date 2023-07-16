import { SupabaseUser } from './supabase.types.js'

export interface SignedInRequest extends Request {
  user: SupabaseUser
}
