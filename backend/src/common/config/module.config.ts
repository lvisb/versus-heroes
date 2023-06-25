import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { plainToInstance } from 'class-transformer'
import { Env } from './env.config.js'
import { validateSync } from 'class-validator'

export const ConfigModule = NestConfigModule.forRoot({
  cache: true,
  isGlobal: true,
  envFilePath: ['.env'],

  validate: (config: Record<string, unknown>) => {
    const validateConfig = plainToInstance(Env, config, {
      excludeExtraneousValues: true,
    })

    const errors = validateSync(validateConfig)

    if (errors.length) throw new Error(errors.toString())

    return validateConfig
  },
})
