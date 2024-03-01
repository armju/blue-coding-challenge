import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
// Importa servicios o módulos necesarios...

@Processor('url-processing')
export class UrlProcessor {
  @Process()
  async handleUrlJob(job: Job<{}>) {
    // Lógica para procesar el trabajo, por ejemplo, obtener el título de una página web.
  }
}
