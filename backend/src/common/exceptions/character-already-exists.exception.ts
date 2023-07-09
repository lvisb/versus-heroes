import { HttpCustomException } from './http-custom.exception.js'

export class CharacterAlreadyExists extends HttpCustomException {
  constructor() {
    super(
      HttpCustomException.createBody({
        id: CharacterAlreadyExists.name,
        message: 'Character already exists',
        statusCode: 409,
      }),
      409,
    )
  }
}
