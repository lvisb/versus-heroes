import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '#config/config.service.js'
import { SupabaseUser } from '#common/types/supabase.types.js'

export const JwtStrategyName = 'jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JwtStrategyName) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.SUPABASE_JWT_SECRET,
    })
  }

  async validate(payload: SupabaseUser): Promise<SupabaseUser> {
    return payload
  }
}
