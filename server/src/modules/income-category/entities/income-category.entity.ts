import { ApiProperty } from '@nestjs/swagger';
import { IncomeCategory } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class IncomeCategoryEntity implements IncomeCategory {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  color: string;

  @Exclude()
  userId: number;
}
