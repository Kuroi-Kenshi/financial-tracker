import { ApiProperty } from '@nestjs/swagger';
import { Investment } from '@prisma/client';

export class InvestmentEntity implements Investment {
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
