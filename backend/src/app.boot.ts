import { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { useContainer } from 'class-validator'
import { AppModule } from '#app.module.js'
import validationPipeConfig from '#common/config/validation-pipe.config.js'
import { HttpExceptionFilter } from '#common/filters/http-exception.filter.js'
import { ConfigService } from '#common/services/config.service.js'

export class App {
  // singleton instance
  private static instance: App

  // app nestjs
  public app?: INestApplication

  // disallow new App()
  private constructor() {}

  /**
   * Returns singleton instance.
   *
   * @static
   * @returns {App}
   */
  public static getInstance(): App {
    if (!App.instance) App.instance = new App()

    return App.instance
  }

  /**
   * Initializes NestJS application.
   *
   * @async
   */
  async bootstrap() {
    if (this.app) throw new Error('[App] Already started')

    // app instance
    this.app = await NestFactory.create(AppModule)

    // makes class-validator use nestjs
    // for dependency injection, allowing
    // to use services and models in validation
    useContainer(this.app.select(AppModule), {
      fallbackOnErrors: true,
    })

    // cors
    this.app.enableCors({
      origin: [
        // ...env().WEBSITE_BACKEND_CORS?.split(',')
      ],
    })

    // global error handling, returning a pre-formatted 
    // json with the error.
    this.app.useGlobalFilters(new HttpExceptionFilter())

    // global pipes for data transformation and validation 
    // of data posted to the endpoints of controllers.
    this.app.useGlobalPipes(validationPipeConfig)

    await this.app.listen(App.configService.BACKEND_PORT)
  }

  /**
   * Gets an instance of the ConfigService.
   * Usage: App.configService.get(...)
   *
   * @returns {ConfigService} 
   */
  static get configService(): ConfigService {
    return App.instance.app!.get<ConfigService>(ConfigService)
  }

  /**
   * Gets an instance of the I18nService.
   * Usage: App.i18nService.translate(...)
   *
   * @returns {I18nService}
   */
  // static get i18nService(): I18nService {
  //   return App.instance.app.get<I18nService>(I18nService)
  // }
}
