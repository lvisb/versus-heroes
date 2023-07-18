import { Global, Module } from '@nestjs/common'
import { SupabaseClient, SupabaseClientProvider } from './supabase.provider.js'
import { ConfigModule } from '#config/config.module.js'
import { SupabaseService } from './supabase.service.js'

@Global()
@Module({
  imports: [ConfigModule],
  providers: [SupabaseClientProvider, SupabaseService],
  exports: [SupabaseClient, SupabaseService],
})
export class SupabaseModule {}
