import { ApiProperty } from '@nestjs/swagger';
import { ExpenseCategory } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class ExpenseCategoryEntity implements ExpenseCategory {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  limitPerMonth: number | null;

  @ApiProperty()
  color: string;

  @Exclude()
  userId: number;

  constructor(partial: Partial<ExpenseCategoryEntity>) {
    Object.assign(this, partial);
  }
}
