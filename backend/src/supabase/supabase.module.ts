import { Global, Module } from '@nestjs/common'
import { SupabaseClient, SupabaseClientProvider } from './supabase.provider.js'
import { ConfigModule } from '#config/config.module.js'

@Global()
@Module({
  imports: [ConfigModule],
  providers: [SupabaseClientProvider],
  exports: [SupabaseClient],
})
export class SupabaseModule {}
