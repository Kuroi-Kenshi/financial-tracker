import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ValidationPipe,
  UsePipes,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
} from '@nestjs/common';
import { ExpenseCategoryService } from './expense-category.service';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expense-category.dto';
import { CurrentUser } from '../../decorators';

import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ExpenseCategoryEntity } from './entities/expense-category.entity';
import { ExpenseCategoryFilterQuery } from './expense-category.types';

@Controller('expense-category')
@ApiTags('Expense Category')
@UseInterceptors(ClassSerializerInterceptor)
export class ExpenseCategoryController {
  constructor(private expenseCategoryService: ExpenseCategoryService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: ExpenseCategoryEntity })
  async create(
    @CurrentUser('id') userId: number,
    @Body() createExpenseCategoryDto: CreateExpenseCategoryDto,
  ) {
    return await this.expenseCategoryService.create(
      userId,
      createExpenseCategoryDto,
    );
  }

  @Get()
  @ApiCreatedResponse({ type: ExpenseCategoryEntity, isArray: true })
  async findAll(
    @CurrentUser('id') userId: number,
    @Query() query: ExpenseCategoryFilterQuery,
  ) {
    const expenseCategories =
      await this.expenseCategoryService.findWithExpenses(userId, query);
    return expenseCategories.map(
      category => new ExpenseCategoryEntity(category),
    );
  }

  // @Get('expenses')
  // @ApiCreatedResponse({ type: ExpenseCategoryEntity, isArray: true })
  // async findWithExpenses(@CurrentUser('id') userId: number) {
  //   const expenseCategories =
  //     await this.expenseCategoryService.findWithExpenses(userId);
  //   return expenseCategories.map(
  //     category => new ExpenseCategoryEntity(category),
  //   );
  // }

  @Get(':id')
  @ApiCreatedResponse({ type: ExpenseCategoryEntity })
  async findById(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('id') userId: number,
  ) {
    return await this.expenseCategoryService.findById(id, userId);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: ExpenseCategoryEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('id') userId: number,
    @Body() updateExpenseCategoryDto: UpdateExpenseCategoryDto,
  ) {
    return await this.expenseCategoryService.update(
      id,
      userId,
      updateExpenseCategoryDto,
    );
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: ExpenseCategoryEntity })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('id') userId: number,
  ) {
    return await this.expenseCategoryService.remove(id, userId);
  }
}
