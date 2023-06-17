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
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { CurrentUser } from '../../decorators';
import { ExpenseFilterQuery } from './expense.types';
import { ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ExpenseEntity } from './entities/expense.entity';

@Controller('expense')
@ApiTags('Expense')
@UseInterceptors(ClassSerializerInterceptor)
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: ExpenseEntity })
  async create(
    @CurrentUser('id') id: number,
    @Body() createExpenseDto: CreateExpenseDto,
  ) {
    return await this.expenseService.create(id || 1, createExpenseDto);
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
  async findAll(@Query() query: ExpenseFilterQuery) {
    return await this.expenseService.findByFilter(query);
  }

  @Get(':id')
  @ApiCreatedResponse({ type: ExpenseEntity })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return new ExpenseEntity(await this.expenseService.findById(id));
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: ExpenseEntity })
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return await this.expenseService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: ExpenseEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.expenseService.remove(id);
  }
}
