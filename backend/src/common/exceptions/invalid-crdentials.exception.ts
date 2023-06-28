import { HttpCustomException } from './http-custom.exception.js'

export class SupabaseAuthException extends HttpCustomException {
  constructor(message: string, statusCode: number) {
    super(
      HttpCustomException.createBody({
        id: SupabaseAuthException.name,
        message,
        statusCode,
      }),
      statusCode,
    )
  }
}
