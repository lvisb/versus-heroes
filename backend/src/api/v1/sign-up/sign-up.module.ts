import { Module } from '@nestjs/common'
import { SignUpController } from './sign-up.controller.js'
import { SignUpService } from './sign-up.service.js'

@Module({
  controllers: [SignUpController],
  providers: [SignUpService],
})
export class SignUpModule {}
