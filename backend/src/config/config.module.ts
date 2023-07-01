import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { plainToInstance } from 'class-transformer'
import { validateSync } from 'class-validator'
import { Module } from '@nestjs/common'
import { Env } from '#common/env.config.js'
import { ConfigService } from './config.service.js'

const ConfigModuleSetup = NestConfigModule.forRoot({
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

@Module({
  imports: [ConfigModuleSetup],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
