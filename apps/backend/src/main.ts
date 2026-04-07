import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const config = app.get(ConfigService);
  const port = config.get<number>('PORT', 4000);
  const corsOrigin = config.get<string>('CORS_ORIGIN', 'http://localhost:5173');
  const allowedOrigins = corsOrigin
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  const matchesWildcard = (origin: string, pattern: string) => {
    if (!pattern.includes('*')) return origin === pattern;
    const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace('*', '.*');
    const regex = new RegExp(`^${escaped}$`);
    return regex.test(origin);
  };

  app.use(helmet());
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }

      const allowed = allowedOrigins.some((pattern) => matchesWildcard(origin, pattern));
      callback(allowed ? null : new Error('Origin not allowed by CORS'), allowed);
    },
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Money Mentor API')
    .setDescription('Production backend for Money Mentor')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
}

void bootstrap().catch((error) => {
  console.error('Backend bootstrap failed', error);
  process.exit(1);
});
