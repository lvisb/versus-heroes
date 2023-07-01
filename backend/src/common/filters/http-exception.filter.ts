import { ValidationExceptionItem } from '#common/validation-pipe.config.js'
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common'
import { Response } from 'express'
import { getContextObject, I18nContext } from 'nestjs-i18n'

/**
 * A wrapper class for all unhandled errors in the system.
 *
 * Based on an example from NestJS:
 * {@link https://docs.nestjs.com/exception-filters#exception-filters-1}
 *
 * @implements ExceptionFilter
 */
@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const i18n = getContextObject(host).i18nContext
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()
    const exceptionResponse = exception.getResponse() as any

    // there can be either a single error message or
    // multiple error messages in case of form field validation.
    const isSingleError = !exceptionResponse.errors

    if (isSingleError) {
      return response.status(status).json({
        ...exceptionResponse,
        // tries to retrieve the error message from internationalization.
        error: translateError(exceptionResponse.error, i18n),
      })
    }

    return response.status(status).json({
      ...exceptionResponse,
      // tries to retrieve the error message from internationalization.
      errors: translateMultipleErrors(exceptionResponse.errors, i18n),
    })
  }
}

/**
 * Tries to retrieve the error message from internationalization files,
 * or returns the original message.
 *
 * @param message - Raw message, or key in the translation files.
 * Ex: Validation.INVALID_EMAIL
 * @param i18n - Instance of i18n.
 * @returns Returns the translated message or the original message.
 */
const translateError = (message: string, i18n: I18nContext) => {
  // if the message follows a format like "Validation.INVALID_EMAIL",
  // it tries to retrieve the text from the i18n.
  if (/\w+\.[A-Z0-9\_]/.test(message)) return i18n.t(message)

  // otherwise, it returns the original message.
  return message
}

/**
 * Tries to retrieve the error message from internationalization files
 *
 * @param {ValidationExceptionItem[]} errors - Array of errors
 * found in the request.
 * @param i18n - Instance of i18n.
 * @returns Returns the translated messages or the original messages.
 */
const translateMultipleErrors = (
  errors: ValidationExceptionItem[],
  i18n: I18nContext,
) =>
  errors.map((item) => ({
    ...item,
    message: translateError(item.message, i18n),
  }))
