import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['http://localhost:5173', 'http://dev.ll3.kr:5173'],
    credentials: true,
  })
  await app.listen(3000);
}
bootstrap();
