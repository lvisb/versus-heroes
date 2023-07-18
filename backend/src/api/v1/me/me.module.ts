import { Module } from '@nestjs/common'
import { MeController } from './me.controller.js'
import { MeService } from './me.service.js'

@Module({
  controllers: [MeController],
  providers: [MeService],
})
export class MeModule {}
