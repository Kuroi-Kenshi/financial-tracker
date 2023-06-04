import { Module } from '@nestjs/common';
import { FinancialGoalService } from './financial-goal.service';
import { FinancialGoalController } from './financial-goal.controller';

@Module({
  controllers: [FinancialGoalController],
  providers: [FinancialGoalService],
})
export class FinancialGoalModule {}
