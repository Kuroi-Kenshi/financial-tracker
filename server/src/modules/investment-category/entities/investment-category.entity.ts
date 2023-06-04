import { ApiProperty } from '@nestjs/swagger';
import { InvestmentCategory } from '@prisma/client';

export class InvestmentCategoryEntity implements InvestmentCategory {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  userId: number;
}
