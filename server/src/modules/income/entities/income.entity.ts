import { ApiProperty } from '@nestjs/swagger';
import { Income } from '@prisma/client';

export class IncomeEntity implements Income {
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
