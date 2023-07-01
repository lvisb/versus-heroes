import { HttpCustomException } from './http-custom.exception.js'

export class InvalidTokenException extends HttpCustomException {
  constructor() {
    super(
      HttpCustomException.createBody({
        id: InvalidTokenException.name,
        message: 'Invalid or expired token',
        statusCode: 401,
      }),
      401,
    )
  }
}
