import { ConfigService } from '#config/config.service.js'
import {
  SupabaseClient as InternalSupabaseClient,
  createClient,
} from '@supabase/supabase-js'

export const SupabaseClient = 'SupabaseClient'

export const SupabaseClientProvider: any = {
  provide: SupabaseClient,
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<InternalSupabaseClient> => {
    const supabase = createClient(
      configService.SUPABASE_URL,
      configService.SUPABASE_KEY,
    )

    return supabase
  },
}
