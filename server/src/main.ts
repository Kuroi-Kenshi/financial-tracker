import { ConfigService } from '@nestjs/config';
import { PrismaService } from './modules/prisma/prisma.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from './exceptionFilters/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const appPort = config.get<number>('APP_PORT') || 3000;
  const isProd = config.get<string>('NODE_ENV') === 'production';

  app.enableCors();
  app.setGlobalPrefix('api');

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  if (!isProd) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Financial Tracker')
      .setDescription('The Financial Tracker API description')
      .setVersion('1.0')
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
      .addSecurityRequirements('bearer')
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('swagger', app, document, {
      swaggerOptions: {
        defaultModelsExpandDepth: -1, //скрывает блок Schemas в UI
        persistAuthorization: true,
      },
    });
  }

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(appPort, () => {
    console.log(`Server started on ${appPort} port`);
  });
}
bootstrap();
