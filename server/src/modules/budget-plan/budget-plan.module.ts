import { Module } from '@nestjs/common';
import { BudgetPlanService } from './budget-plan.service';
import { BudgetPlanController } from './budget-plan.controller';

@Module({
  controllers: [BudgetPlanController],
  providers: [BudgetPlanService],
})
export class BudgetPlanModule {}
