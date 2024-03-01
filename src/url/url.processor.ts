import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';


@Processor('url-processing')
export class UrlProcessor {
  @Process('process-url')
async handleUrlJob(job: Job<{ urlId: number; originalUrl: string }>) {
  const { urlId, originalUrl } = job.data;
  // Aquí iría la lógica para extraer el título de la página web.
  // Por ejemplo, usando axios para hacer una petición a `originalUrl` y luego parsear el HTML para encontrar el título.
  // Finalmente, actualiza la entidad Url con el título encontrado.
}

  
}
