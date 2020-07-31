import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  // Configurar títulos de documnentación
  const options = new DocumentBuilder()
    .setTitle('Bookstore REST API')
    .setDescription('API REST de Bookstore')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  // La ruta en que se sirve la documentación
  SwaggerModule.setup('docs', app, document);

  await app.listen(3001);
}
bootstrap();
