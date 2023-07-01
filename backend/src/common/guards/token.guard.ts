import { SupabaseStrategyName } from '#api/v1/auth/auth.stragegy.js'
import { InvalidTokenException } from '#common/exceptions/invalid-token.exception.js'
import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class TokenGuard extends AuthGuard(SupabaseStrategyName) {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      await super.canActivate(context)

      return Promise.resolve(true)
    } catch (error) {
      throw new InvalidTokenException()
    }
  }
}
