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
exports.UrlProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const typeorm_1 = require("typeorm");
const url_entity_1 = require("./entities/url.entity");
const typeorm_2 = require("@nestjs/typeorm");
const axios_1 = require("axios");
const cheerio = require("cheerio");
let UrlProcessor = class UrlProcessor {
    constructor(urlsRepository) {
        this.urlsRepository = urlsRepository;
    }
    async handleUrlJob(job) {
        const { urlId, originalUrl } = job.data;
        try {
            const { data: html } = await axios_1.default.get(originalUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
                }
            });
            const $ = cheerio.load(html);
            const title = $('title').text();
            await this.urlsRepository.update(urlId, { title });
        }
        catch (error) {
            console.error(`Error processing URL ${originalUrl}:`, error.message);
        }
    }
};
exports.UrlProcessor = UrlProcessor;
__decorate([
    (0, bull_1.Process)('process-url'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UrlProcessor.prototype, "handleUrlJob", null);
exports.UrlProcessor = UrlProcessor = __decorate([
    (0, bull_1.Processor)('url-processing'),
    __param(0, (0, typeorm_2.InjectRepository)(url_entity_1.Url)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UrlProcessor);
//# sourceMappingURL=url.processor.js.map