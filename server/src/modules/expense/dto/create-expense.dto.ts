import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateExpenseDto {
  @ApiProperty({ default: 3333.44 })
  @IsNumber()
  amount: number;

  @ApiProperty({ default: 'Продукты' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ default: '2023-05-16T19:20:30.451Z' })
  @IsNotEmpty()
  @IsString()
  // date: Date;
  date: string;

  @ApiProperty({ default: 1 })
  @IsOptional()
  categoryId: number;

  @ApiProperty({ default: 8 })
  @IsNumber()
  currencyId: number;
}
