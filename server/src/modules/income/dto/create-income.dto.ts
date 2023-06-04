import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateIncomeDto {
  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsDate()
  // date: Date;
  date: string;

  @ApiProperty()
  @IsNumber()
  categoryId: number;

  @ApiProperty()
  @IsNumber()
  currencyId: number;
}
