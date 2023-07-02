import { ApiProperty } from '@nestjs/swagger';
import { Currency } from '@prisma/client';

export class CurrencyEntity implements Currency {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  symbol: string;
}
