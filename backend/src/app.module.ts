import { ConfigModule } from '#common/config/module.config.js'
import { ConfigService } from '#common/services/config.service.js'
import { Module } from '@nestjs/common'

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [ConfigService],
  exports: [],
})
export class AppModule {}
