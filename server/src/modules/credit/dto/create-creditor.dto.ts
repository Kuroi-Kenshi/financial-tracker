import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCreditDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsOptional()
  description: string;

  @ApiProperty({ default: 1111 })
  @IsNumber()
  amount: number;

  @ApiProperty({ default: '2023-05-16T19:20:30.451Z' })
  @IsString()
  startDate: string;

  @ApiProperty({ default: '2023-05-16T19:20:30.451Z' })
  @IsString()
  dueDate: string;

  @ApiProperty()
  @IsNumber()
  totalPayments: number;

  @ApiProperty({ default: 1 })
  @IsNumber()
  creditorId: number;

  @ApiProperty({ default: 1 })
  @IsNumber()
  currencyId: number;
}
