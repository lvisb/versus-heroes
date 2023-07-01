import { HttpCustomException } from './http-custom.exception.js'

export class EmailAlreadyExistsException extends HttpCustomException {
  constructor() {
    super(
      HttpCustomException.createBody({
        id: EmailAlreadyExistsException.name,
        message: 'Email already exists',
        statusCode: 409,
      }),
      409,
    )
  }
}
