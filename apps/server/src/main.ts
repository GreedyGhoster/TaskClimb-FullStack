import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(compression());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.enableCors({
    origin: 'http://localhost:5173',
    allowedHeaders: 'Content-Type, Authorization',
  });

  app.setGlobalPrefix('/api');

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('TaskClimb API Documentation')
    .setDescription(
      'Here are all the project endpoints. Register for your account and enter the token in the "Authorize" field. ',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(4580);
}
bootstrap();
