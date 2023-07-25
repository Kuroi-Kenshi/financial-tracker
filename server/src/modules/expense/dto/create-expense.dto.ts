import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateExpenseDto {
  @ApiProperty({ default: 3333.44 })
  @IsNumber()
  amount: number;

  @ApiProperty({ default: 'Продукты' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ default: 'Описание' })
  description: string;

  @ApiProperty({ default: '2023-05-16T19:20:30.451Z' })
  @IsNotEmpty()
  @IsString()
  date: string;

  @ApiProperty({ default: 1 })
  @IsOptional()
  categoryId: number;

  @ApiProperty({ default: 1 })
  @IsNumber()
  currencyId: number;
}
