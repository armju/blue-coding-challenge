// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlModule } from './url/url.module';
import { Url } from './url/entities/url.entity';

@Module({
  imports: [
    UrlModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Url],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
