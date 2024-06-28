import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const logger = new Logger('Bootstrap');
  const serverUrl = await app.getUrl();
  logger.log(`Server is running at ${serverUrl}`);
  logger.log(app.getHttpAdapter().getInstance()._router.stack.map(layer => layer.route ? layer.route.path : null).filter(path => path !== null));

}
bootstrap();
