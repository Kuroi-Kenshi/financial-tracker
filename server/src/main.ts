import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { PrismaService } from './modules/prisma/prisma.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from './exceptionFilters/prisma-client-exception.filter';
import { AtGuard } from './guards';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import helmet from 'helmet';
import * as fs from 'node:fs';

async function bootstrap() {
  // const httpsOptions = {};

  const keyFile = fs.readFileSync(
    './../../certbot/conf/live/fin-tracker.aeronova.space/privkey.pem',
  );
  const certFile = fs.readFileSync(
    './../../certbot/conf/live/fin-tracker.aeronova.space/cert.pem',
  );

  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: keyFile,
      cert: certFile,
    },
  });
  const config = app.get(ConfigService);
  const appPort = config.get<number>('APP_PORT') || 3000;
  const isProd = config.get<string>('NODE_ENV') === 'production';
  const HOST = config.get<number>('HOST') || 'http://localhost:3000';

  app.use(helmet());
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: `${HOST}`,
  });
  app.setGlobalPrefix('api');
  app.use(morgan('tiny'));

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  const reflector = new Reflector();
  app.useGlobalGuards(new AtGuard(reflector));

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
