import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller.js'
import { AuthService } from './auth.service.js'
import { SupabaseStrategy } from './auth.stragegy.js'
import { ConfigModule } from '#common/config/module.config.js'
import { ConfigService } from '#common/services/config.service.js'
import { SupabaseModule } from '#supabase/supabase.module.js'

@Module({
  imports: [ConfigModule, SupabaseModule],
  controllers: [AuthController],
  providers: [ConfigService, AuthService, SupabaseStrategy],
})
export class AuthModule {}
