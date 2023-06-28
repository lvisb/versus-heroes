import { ConfigService } from '#common/services/config.service.js'
import { Global, Module } from '@nestjs/common'
import { SupabaseClient, SupabaseClientProvider } from './supabase.provider.js'

@Global()
@Module({
  imports: [],
  providers: [SupabaseClientProvider, ConfigService],
  exports: [SupabaseClient],
})
export class SupabaseModule {}
