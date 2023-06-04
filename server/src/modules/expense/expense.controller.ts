import { IsOptional } from 'class-validator';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { CurrentUser } from 'src/decorators';

import { ExpenseFilterQuery } from './expense.types';
import { ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ExpenseEntity } from './entities/expense.entity';

@Controller('expense')
@ApiTags('Expense')
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: ExpenseEntity })
  create(
    @CurrentUser('id') id: number,
    @Body() createExpenseDto: CreateExpenseDto,
  ) {
    return this.expenseService.create(id || 1, createExpenseDto);
  }

  @Get()
  @ApiCreatedResponse({ type: ExpenseEntity, isArray: true })
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
  findAll(@Query() query: ExpenseFilterQuery) {
    return this.expenseService.findByFilter(query);
  }

  @Get(':id')
  @ApiCreatedResponse({ type: ExpenseEntity })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.findById(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: ExpenseEntity })
  @UsePipes(new ValidationPipe())
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expenseService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: ExpenseEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.remove(id);
  }
}
