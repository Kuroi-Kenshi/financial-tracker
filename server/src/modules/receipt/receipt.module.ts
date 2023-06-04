import { MulterModule } from '@nestjs/platform-express';
import { Module } from '@nestjs/common';
import { ReceiptService } from './receipt.service';
import { ReceiptController } from './receipt.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';
import { SERVE_ROOT } from './receipt.constants';

@Module({
  imports: [
    MulterModule.register({
      dest: `${path}/uploads`,
    }),
    //раздачу статики сделать через nginx
    ServeStaticModule.forRoot({
      rootPath: `${path}`,
      serveRoot: SERVE_ROOT,
    }),
  ],
  controllers: [ReceiptController],
  providers: [ReceiptService],
})
export class ReceiptModule {}
