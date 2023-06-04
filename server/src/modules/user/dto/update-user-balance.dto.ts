import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateUserBalanceDto {
  @ApiProperty({ default: 500 })
  @IsNumber()
  balance: number;

  @ApiProperty({ default: 1 })
  @IsNumber()
  currencyId: number;
}
