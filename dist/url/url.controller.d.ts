import { UrlService } from './url.service';
export declare class UrlController {
    private readonly urlService;
    constructor(urlService: UrlService);
    shortenUrl(url: string): Promise<{
        shortUrl: string;
    }>;
    getOriginalUrl(shortUrl: string): Promise<{
        url: string;
        statusCode: number;
    }>;
    getTopUrls(): Promise<import("./entities/url.entity").Url[]>;
}
