export type SupabaseUser = {
  aud: string
  exp: number
  sub: string
  email: string
  phone: string
  app_metadata: Record<any, any>
  user_metadata: Record<any, any>
  role: string
  aal: string
  amr: Record<string, any>[]
  session_id: string
}
