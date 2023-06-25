import { Env } from '#common/config/env.config.js'
import { Injectable } from '@nestjs/common'
import { ConfigService as NestConfigService } from '@nestjs/config'

@Injectable()
export class ConfigService implements Env {
  constructor(private readonly service: NestConfigService) {}

  get NODE_ENV(): 'development' | 'production' {
    return this.service.get<'development' | 'production'>('NODE_ENV')
  }

  get BACKEND_PORT(): number {
    return this.service.get<number>('BACKEND_PORT')
  }

  get DATABASE_URL(): string {
    return this.service.get<string>('DATABASE_URL')
  }
}
