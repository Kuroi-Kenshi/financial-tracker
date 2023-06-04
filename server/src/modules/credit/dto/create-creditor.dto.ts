import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCreditDto {
  @ApiProperty()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsString()
  dueDate: string;

  @ApiProperty()
  @IsNumber()
  totalPayments: number;

  @ApiProperty()
  @IsNumber()
  creditorId: number;

  @ApiProperty()
  @IsNumber()
  currencyId: number;
}
