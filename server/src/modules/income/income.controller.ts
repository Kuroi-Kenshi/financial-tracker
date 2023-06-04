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
import { CurrentUser } from 'src/decorators';

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
    @CurrentUser('id') id: number,
    @Body() createIncomeDto: CreateIncomeDto,
  ) {
    return this.incomeService.create(id, createIncomeDto);
  }

  @Get()
  @ApiCreatedResponse({ type: IncomeEntity, isArray: true })
  @ApiQuery({
    name: 'dateFrom',
    description: 'От какой даты',
  })
  @ApiQuery({
    name: 'dateTo',
    description: 'По какую дату',
  })
  @ApiQuery({
    name: 'categoryId',
    description: 'id категории трат',
  })
  @ApiQuery({
    name: 'skip',
    description: 'Сколько записей пропустить',
  })
  @ApiQuery({
    name: 'take',
    description: 'Сколько записей взять',
  })
  @ApiQuery({
    name: 'orderBy',
    description: 'Как сортировать',
    enum: ['desc', 'asc'],
  })
  findAll(@Query() query: IncomeFilterQuery) {
    return this.incomeService.findByFilter(query);
  }

  @Get(':id')
  @ApiCreatedResponse({ type: IncomeEntity })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.incomeService.findById(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: IncomeEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateIncomeDto: UpdateIncomeDto,
  ) {
    return this.incomeService.update(id, updateIncomeDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: IncomeEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.incomeService.remove(id);
  }
}
