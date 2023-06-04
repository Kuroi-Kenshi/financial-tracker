import { ApiProperty } from '@nestjs/swagger';
import { BudgetPlan } from '@prisma/client';

export class BudgetPlanEntity implements BudgetPlan {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  currencyId: number;
}
