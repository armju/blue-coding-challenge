import { Repository } from 'typeorm';
import { Url } from './entities/url.entity';
import { Queue } from 'bull';
export declare class UrlService {
    private urlsRepository;
    private urlQueue;
    constructor(urlsRepository: Repository<Url>, urlQueue: Queue);
    shortenUrl(originalUrl: string): Promise<Url>;
    redirectToOriginal(shortUrl: string): Promise<Url>;
    getTopUrls(): Promise<Url[]>;
}
