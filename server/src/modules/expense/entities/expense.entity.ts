import { ApiProperty } from '@nestjs/swagger';
import { Expense } from '@prisma/client';

export class ExpenseEntity implements Expense {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  categoryId: number | null;

  @ApiProperty()
  currencyId: number;
}
