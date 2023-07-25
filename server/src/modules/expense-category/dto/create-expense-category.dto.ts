import { ApiProperty } from '@nestjs/swagger';
import { IsHexColor, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateExpenseCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsHexColor()
  color: string;

  @ApiProperty()
  @IsOptional()
  limitPerMonth: number;
}
