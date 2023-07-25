import { ApiProperty } from '@nestjs/swagger';
import { Income } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class IncomeEntity implements Income {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
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

  constructor(partial: Partial<IncomeEntity>) {
    Object.assign(this, partial);
  }
}
