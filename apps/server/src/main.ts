import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';

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
    .addBearerAuth()
    .setTitle('TaskClimb API Documentation')
    .setDescription(
      'Here are all the project endpoints. Register for your account and enter the token in the "Authorize" field. ',
    )
    .setVersion('1.0')
    .addTag('taskclimb')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(4580);
}
bootstrap();
