import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'url-processing',
    }),
  ],
  providers: [UrlService],
  controllers: [UrlController]
})
export class UrlModule {}
