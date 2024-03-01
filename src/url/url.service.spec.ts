import { Test, TestingModule } from '@nestjs/testing';
import { UrlService } from './url.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Url } from './entities/url.entity';
import { Repository } from 'typeorm';

describe('UrlService', () => {
  let service: UrlService;
  let mockUrlRepository: Partial<Repository<Url>>;

  beforeEach(async () => {
    // Mock del repositorio
    mockUrlRepository = {
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest.fn().mockImplementation((url) => Promise.resolve({ id: Date.now(), ...url })),
      findOne: jest.fn().mockImplementation(({ where: { shortUrl } }) => Promise.resolve({ originalUrl: 'https://example.com', shortUrl })),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlService,
        {
          provide: getRepositoryToken(Url),
          useValue: mockUrlRepository,
        },
      ],
    }).compile();

    service = module.get<UrlService>(UrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a short URL', async () => {
    const originalUrl = 'https://example.com';
    const result = await service.shortenUrl(originalUrl);

    expect(result).toBeDefined();
    expect(result.shortUrl).toBeDefined();
    expect(mockUrlRepository.create).toHaveBeenCalledWith({ originalUrl, shortUrl: expect.any(String) });
    expect(mockUrlRepository.save).toHaveBeenCalled();
  });

  it('should redirect to the original URL', async () => {
    const shortUrl = 'abcd1234';
    const result = await service.redirectToOriginal(shortUrl);

    expect(result).toBeDefined();
    expect(result.originalUrl).toBe('https://example.com');
    expect(mockUrlRepository.findOne).toHaveBeenCalledWith({ where: { shortUrl } });
  });
});
