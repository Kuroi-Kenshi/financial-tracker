import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateInvestmentDto {
  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsDate()
  date: Date;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  categoryId: number;

  @ApiProperty()
  @IsNumber()
  currencyId: number;
}
