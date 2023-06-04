import { Module } from '@nestjs/common';
import { CreditController } from './creditor.controller';
import { CreditService } from './creditor.service';

@Module({
  controllers: [CreditController],
  providers: [CreditService],
})
export class CreditModule {}
