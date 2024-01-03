import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
    .setTitle('TaskClimb API Documentation')
    .setDescription('Here are all the endpoints in the project')
    .setVersion('1.0')
    .addTag('taskclimb')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(4580);
}
bootstrap();
