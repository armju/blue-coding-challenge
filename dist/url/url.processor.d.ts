import { Job } from 'bull';
import { Repository } from 'typeorm';
import { Url } from './entities/url.entity';
export declare class UrlProcessor {
    private readonly urlsRepository;
    constructor(urlsRepository: Repository<Url>);
    handleUrlJob(job: Job<{
        urlId: number;
        originalUrl: string;
    }>): Promise<void>;
}
