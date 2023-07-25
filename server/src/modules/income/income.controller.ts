import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { IncomeService } from './income.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { CurrentUser } from '../../decorators';

import { ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IncomeEntity } from './entities/income.entity';
import { IncomeFilterQuery } from './income.types';

@Controller('income')
@ApiTags('Income')
export class IncomeController {
  constructor(private incomeService: IncomeService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: IncomeEntity })
  create(
    @CurrentUser('id') userId: number,
    @Body() createIncomeDto: CreateIncomeDto,
  ) {
    return this.incomeService.create(userId, createIncomeDto);
  }

  @Get()
  @ApiCreatedResponse({ type: IncomeEntity, isArray: true })
  @ApiQuery({
    required: false,
    name: 'dateFrom',
    description: 'От какой даты',
  })
  @ApiQuery({
    required: false,
    name: 'dateTo',
    description: 'По какую дату',
  })
  @ApiQuery({
    required: false,
    name: 'categoryId',
    description: 'id категории трат',
  })
  @ApiQuery({
    required: false,
    name: 'skip',
    description: 'Сколько записей пропустить',
  })
  @ApiQuery({
    required: false,
    name: 'take',
    description: 'Сколько записей взять',
  })
  @ApiQuery({
    required: false,
    name: 'orderBy',
    description: 'Как сортировать',
    enum: ['desc', 'asc'],
  })
  async findAll(
    @Query() query: IncomeFilterQuery,
    @CurrentUser('id') userId: number,
  ) {
    const incomes = await this.incomeService.findByFilter(query, userId);
    return incomes.map(income => new IncomeEntity(income));
  }

  @Get(':id')
  @ApiCreatedResponse({ type: IncomeEntity })
  findById(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('id') userId: number,
  ) {
    return this.incomeService.findById(id, userId);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: IncomeEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateIncomeDto: UpdateIncomeDto,
    @CurrentUser('id') userId: number,
  ) {
    return this.incomeService.update(id, userId, updateIncomeDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: IncomeEntity })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('id') userId: number,
  ) {
    return this.incomeService.remove(id, userId);
  }
}
