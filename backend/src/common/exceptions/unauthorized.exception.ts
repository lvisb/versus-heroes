import { HttpCustomException } from './http-custom.exception.js'

export class UnauthorizedException extends HttpCustomException {
  constructor() {
    super(
      HttpCustomException.createBody({
        id: UnauthorizedException.name,
        message: 'Unauthorized access',
        statusCode: 401,
      }),
      401,
    )
  }
}
