import { config } from '#common/config.js'
import { HttpCustomException } from './http-custom.exception.js'

export class CharLimitExceedException extends HttpCustomException {
  constructor() {
    super(
      HttpCustomException.createBody({
        id: CharLimitExceedException.name,
        message: `I'm sorry, but you have already used your quota of ${config.maxCharsPerHour} created characters in 1 hour.`,
        statusCode: 423,
      }),
      423,
    )
  }
}
