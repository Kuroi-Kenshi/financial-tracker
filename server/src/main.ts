import { ConfigService } from '@nestjs/config';
import { PrismaService } from './modules/prisma/prisma.service';
import { PrismaClientExceptionFilter } from './exceptionFilters/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const config = app.get(ConfigService);
  const appPort = config.get<number>('APP_PORT') || 3000;

  await app.listen(appPort, () => {
    console.log(`Server started on ${appPort} port`);
  });
}
bootstrap();
