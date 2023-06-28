declare namespace ApiResponses {
  interface InputValidationError {
    field: string
    message: string
  }

  interface JsonResponse {
    status: 'ok' | 'error'
    id?: string
    statusCode?: number
    message?: string
    errors?: InputValidationError[]

    [key: string]: any
  }

  interface JsonResponsePagination extends JsonResponse {
    totalItems: number
    itemsPerPage: number
    currentPage: number
    totalPages: number
  }
}
