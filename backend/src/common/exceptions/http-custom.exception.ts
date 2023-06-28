import { HttpException } from '@nestjs/common'

interface CustomBody {
  message?: string
  status?: string
  statusCode?: number
  id?: string
}

export class HttpCustomException extends HttpException {
  static createBody<Body extends CustomBody>(customBody: Body): Body {
    if (!customBody.status) customBody.status = 'error'

    return customBody
  }
}
