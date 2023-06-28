export class HttpResponse {
  static createBody({
    message = undefined,
    status = 'ok',
    id = undefined,
    statusCode = 200,
    ...rest
  }: ApiResponses.JsonResponse | any) {
    return {
      message,
      status,
      id,
      statusCode,
      ...rest,
    }
  }
}
