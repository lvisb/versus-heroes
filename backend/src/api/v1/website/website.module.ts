import { Module } from '@nestjs/common';
import { WebsiteController } from './website.controller.js';
import { WebsiteService } from './website.service.js';

@Module({
  controllers: [WebsiteController],
  providers: [WebsiteService]
})
export class WebsiteModule {}
