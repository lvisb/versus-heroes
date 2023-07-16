import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { JwtStrategyName } from '../strategies/jwt.strategy.js'
import { UnauthorizedException } from '#common/exceptions/unauthorized.exception.js'

@Injectable()
export class TokenGuard extends AuthGuard(JwtStrategyName) {
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) throw new UnauthorizedException()

    return user
  }
}
