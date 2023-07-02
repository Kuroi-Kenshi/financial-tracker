import { ApiProperty } from '@nestjs/swagger';
import { Expense } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class ExpenseEntity implements Expense {
  @ApiProperty({ default: 1 })
  id: number;

  @ApiProperty({ default: 'Обед' })
  name: string;

  @ApiProperty({ default: 'Пообедал в Прайме' })
  description: string;

  @ApiProperty({ default: 380 })
  amount: number;

  @ApiProperty()
  date: Date;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  userId: number;

  @Exclude()
  categoryId: number | null;

  @Exclude()
  currencyId: number;

  constructor(partial: Partial<ExpenseEntity>) {
    Object.assign(this, partial);
  }
}
