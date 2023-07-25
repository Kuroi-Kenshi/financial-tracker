import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDebtDto {
  @IsString()
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsString()
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
  debtorId: number;

  @ApiProperty()
  @IsNumber()
  currencyId: number;
}
