import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from './entities/url.entity';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private urlsRepository: Repository<Url>,
  ) {}

  async shortenUrl(originalUrl: string): Promise<Url> {
    const shortUrl = nanoid(8); 
    const url = this.urlsRepository.create({ originalUrl, shortUrl });
    await this.urlsRepository.save(url);
    return url;
  }

  async redirectToOriginal(shortUrl: string): Promise<Url> {
    const url = await this.urlsRepository.findOne({ where: { shortUrl } });
    if (!url) {
      throw new Error('URL not found');
    }
    url.clickCount += 1;
    await this.urlsRepository.save(url);
    return url;
  }

  async getTopUrls(): Promise<Url[]> {
    return this.urlsRepository.find({
      order: {
        clickCount: 'DESC',
      },
      take: 100,
    });
  }
}
