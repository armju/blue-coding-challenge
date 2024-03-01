import { Controller, Get, Post, Body, Redirect, Param } from '@nestjs/common';
import { UrlService } from './url.service';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('shorten')
  async shortenUrl(@Body('url') url: string) {
    const shortUrl = await this.urlService.shortenUrl(url);
    return { shortUrl: `http://localhost:3000/url/${shortUrl.shortUrl}` };
  }

  @Get(':shortUrl')
  @Redirect()
  async getOriginalUrl(@Param('shortUrl') shortUrl: string) {
    const url = await this.urlService.redirectToOriginal(shortUrl);
    return { url: url.originalUrl, statusCode: 302 };
  }

  @Get('top')
async getTopUrls() {
  return this.urlService.getTopUrls();
}
}
