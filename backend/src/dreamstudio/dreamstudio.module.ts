import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '#config/config.module.js'
import {
  DreamStudioClient,
  DreamStudioClientProvider,
} from './dreamstudio.provider.js'
import { DreamStudioService } from './dreamstudio.service.js'

@Global()
@Module({
  imports: [ConfigModule],
  providers: [DreamStudioClientProvider, DreamStudioService],
  exports: [DreamStudioClient, DreamStudioService],
})
export class DreamstudioModule {}
