import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common'

export type ValidationExceptionItem = {
  field: string
  message: string
  args?: {}
}

/**
 * A class that is injected into all API endpoints,
 * converting the request body/parameters into classes,
 * and performing data validation.
 * Based on an example from NestJS:
 * {@link https://docs.nestjs.com/techniques/validation}
 */
export default new ValidationPipe({
  // performs serialization from plain to class.
  transform: true,

  // if a property in the class has multiple validations,
  // and if an error occurs in the first validation,
  // class-validator does not execute the remaining validations.
  stopAtFirstError: true,

  // disabling default validation messages of class-validator.
  dismissDefaultMessages: true,

  transformOptions: {
    // does not convert strings, numbers, or booleans to their respective types.
    enableImplicitConversion: false,

    excludeExtraneousValues: true,
  },

  /**
   * Formats the JSON in case of validation errors.
   *
   * @param errors - Array of errors found.
   * @returns Formatted JSON with errors.
   *
   * @example
   * {
   * 	"status": "error",
   * 	"errors": [
   *     {
   * 			"field": "name",
   * 			"message": "invalid name"
   * 		},
   * 		{
   * 			"field": "password",
   * 			"message": "invalid password"
   * 		}
   * 	]
   * }
   */
  exceptionFactory: (errors: ValidationError[]) => {
    const mappedErrors = mapChildrenErrors(errors)

    const response: ApiResponses.JsonResponse = {
      statusCode: 400,
      status: 'error',
      errors: mappedErrors,
    }

    return new BadRequestException(response)
  },
})

const mapChildrenErrors = (
  childrenErrors: ValidationError[],
  rootProperty?: string,
) => {
  let mappedErrors: ApiResponses.InputValidationError[] = []

  childrenErrors.forEach((err) => {
    if (err.children && err.children?.length > 0) {
      mappedErrors = mappedErrors.concat(
        mapChildrenErrors(
          err.children,
          rootProperty ? `${rootProperty}.${err.property}` : err.property,
        ),
      )
      return
    }

    mappedErrors.push({
      field: rootProperty ? `${rootProperty}.${err.property}` : err.property,
      message: Object.values(err.constraints!)[0],
    })
  })

  return mappedErrors
}
