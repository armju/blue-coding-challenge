"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const url_entity_1 = require("./entities/url.entity");
const nanoid_1 = require("nanoid");
const bull_1 = require("@nestjs/bull");
let UrlService = class UrlService {
    constructor(urlsRepository, urlQueue) {
        this.urlsRepository = urlsRepository;
        this.urlQueue = urlQueue;
    }
    async shortenUrl(originalUrl) {
        const shortUrl = (0, nanoid_1.nanoid)(8);
        const url = this.urlsRepository.create({ originalUrl, shortUrl });
        await this.urlsRepository.save(url);
        await this.urlQueue.add('getTitle', { id: url.id, originalUrl: url.originalUrl });
        return url;
    }
    async redirectToOriginal(shortUrl) {
        const url = await this.urlsRepository.findOne({ where: { shortUrl } });
        if (!url) {
            throw new Error('URL not found');
        }
        url.clickCount += 1;
        await this.urlsRepository.save(url);
        return url;
    }
    async getTopUrls() {
        return this.urlsRepository.find({
            order: {
                clickCount: 'DESC',
            },
            take: 100,
        });
    }
};
exports.UrlService = UrlService;
exports.UrlService = UrlService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(url_entity_1.Url)),
    __param(1, (0, bull_1.InjectQueue)('url-processing')),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], UrlService);
//# sourceMappingURL=url.service.js.map