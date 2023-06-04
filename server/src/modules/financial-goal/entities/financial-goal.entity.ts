import { ApiProperty } from '@nestjs/swagger';
import { Currency, FinancialGoal } from '@prisma/client';

type FinancialGoalType = Omit<FinancialGoal, 'currencyId' | 'userId'> & {
  currency: Currency;
};

export class FinancialGoalEntity implements FinancialGoalType {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  totalAmount: number;

  @ApiProperty()
  deadline: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  currency: Currency;
}
