import { ApiProperty } from '@nestjs/swagger';
import { IsHexColor, IsNotEmpty } from 'class-validator';

export class CreateInvestmentCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsHexColor()
  color: string;
}
