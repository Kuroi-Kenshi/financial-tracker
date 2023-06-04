import { Module } from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { InvestmentController } from './investment.controller';

@Module({
  controllers: [InvestmentController],
  providers: [InvestmentService],
})
export class InvestmentModule {}
