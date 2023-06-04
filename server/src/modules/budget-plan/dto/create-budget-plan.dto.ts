import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateBudgetPlanDto {
  @ApiProperty({
    description: 'Имя плана по бюджету',
    example: 'Бюджет на месяц',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Количество денег для бюджета',
    example: 50000.0,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Описание плана по бюджету',
    example: 'Это мой бюджет план на месяц',
    required: false,
  })
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'ID используемой валюты',
    example: 1,
  })
  @IsNumber()
  currencyId: number;

  @ApiProperty({
    type: [Number],
    description: 'Массив с категориями трат',
    example: [1, 2, 3],
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  expenseCategoryIds: number[];

  @ApiProperty({
    type: Number,
    description: 'Id пользователя',
    example: 1,
  })
  @IsNumber()
  userId: number;
}
