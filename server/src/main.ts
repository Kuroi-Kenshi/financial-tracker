import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const config = app.get(ConfigService);
  const appPort = config.get<number>('APP_PORT') || 3000;

  await app.listen(appPort, () => {
    console.log(`Server started on ${appPort} port`);
  });
}
bootstrap();
