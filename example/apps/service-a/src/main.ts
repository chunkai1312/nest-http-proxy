import { NestFactory } from '@nestjs/core';
import { ServiceAModule } from './service-a.module';

async function bootstrap() {
  const app = await NestFactory.create(ServiceAModule);
  await app.listen(3001);
}
bootstrap();
