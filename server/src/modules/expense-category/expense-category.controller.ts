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
} from '@nestjs/common';
import { ExpenseCategoryService } from './expense-category.service';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expense-category.dto';
import { CurrentUser } from '../../decorators';

import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ExpenseCategoryEntity } from './entities/expense-category.entity';

@Controller('expense-category')
@ApiTags('Expense Category')
@UseInterceptors(ClassSerializerInterceptor)
export class ExpenseCategoryController {
  constructor(private expenseCategoryService: ExpenseCategoryService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: ExpenseCategoryEntity })
  async create(
    @CurrentUser('id') id: number,
    @Body() createExpenseCategoryDto: CreateExpenseCategoryDto,
  ) {
    return await this.expenseCategoryService.create(
      id,
      createExpenseCategoryDto,
    );
  }

  @Get()
  @ApiCreatedResponse({ type: ExpenseCategoryEntity, isArray: true })
  async findAll() {
    const expenseCategories = await this.expenseCategoryService.findAll();
    return expenseCategories.map(
      category => new ExpenseCategoryEntity(category),
    );
  }

  @Get(':id')
  @ApiCreatedResponse({ type: ExpenseCategoryEntity })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.expenseCategoryService.findById(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: ExpenseCategoryEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExpenseCategoryDto: UpdateExpenseCategoryDto,
  ) {
    return await this.expenseCategoryService.update(
      id,
      updateExpenseCategoryDto,
    );
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: ExpenseCategoryEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.expenseCategoryService.remove(id);
  }
}
