import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { Url } from './entities/url.entity';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    TypeOrmModule.forFeature([Url]),
    BullModule.registerQueue({
      name: 'url-processing',
    }),
  ],
  providers: [UrlService],
  controllers: [UrlController]
})
export class UrlModule {}
