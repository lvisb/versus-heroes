import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller.js'
import { AuthService } from './auth.service.js'
import { SupabaseStrategy } from './auth.stragegy.js'
import { SupabaseModule } from '#supabase/supabase.module.js'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '#config/config.module.js'
import { ConfigService } from '#config/config.service.js'

@Module({
  imports: [
    ConfigModule,
    SupabaseModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.SUPABASE_JWT_SECRET,
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [ConfigService, AuthService, SupabaseStrategy],
})
export class AuthModule {}
