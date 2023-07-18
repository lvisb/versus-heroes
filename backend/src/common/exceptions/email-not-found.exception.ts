import { HttpCustomException } from './http-custom.exception.js'

export class EmailNotFoundException extends HttpCustomException {
  constructor() {
    super(
      HttpCustomException.createBody({
        id: EmailNotFoundException.name,
        message: 'Email not found',
        statusCode: 404,
      }),
      404,
    )
  }
}
