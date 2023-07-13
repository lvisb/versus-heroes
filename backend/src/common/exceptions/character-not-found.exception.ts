import { HttpCustomException } from './http-custom.exception.js'

export class CharacterNotFoundException extends HttpCustomException {
  constructor() {
    super(
      HttpCustomException.createBody({
        id: CharacterNotFoundException.name,
        message: 'Character not found',
        statusCode: 404,
      }),
      404,
    )
  }
}
