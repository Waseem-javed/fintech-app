import { NestFactory } from '@nestjs/core';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  /**
   * For frontend web App
   */
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  /**
   * Swagger Api Documentation
   */
  const options = new DocumentBuilder()
    .setTitle('Fintech Banking App')
    .setDescription('API documentation for the Fintech Banking App')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(9900);
}

bootstrap();
