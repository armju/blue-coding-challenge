import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Repository } from 'typeorm';
import { Url } from './entities/url.entity';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import * as cheerio from 'cheerio';


@Processor('url-processing')
export class UrlProcessor {
  constructor(
    @InjectRepository(Url)
    private readonly urlsRepository: Repository<Url>,
  ) {}

  @Process('process-url')
  async handleUrlJob(job: Job<{ urlId: number; originalUrl: string }>) {
    const { urlId, originalUrl } = job.data;

    try {
      // Realiza una petición HTTP para obtener el HTML de la página
      const { data: html } = await axios.get(originalUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        }
      });

      // Utiliza cheerio para cargar el HTML y extraer el título de la página
      const $ = cheerio.load(html);
      const title = $('title').text();

      // Encuentra la entidad URL por ID y actualiza su título
      await this.urlsRepository.update(urlId, { title });
    } catch (error) {
      console.error(`Error processing URL ${originalUrl}:`, error.message);
      // Maneja errores, por ejemplo, registrando o reintentando el trabajo según sea necesario
    }
  }
}