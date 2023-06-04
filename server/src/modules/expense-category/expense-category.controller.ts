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
} from '@nestjs/common';
import { ExpenseCategoryService } from './expense-category.service';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expense-category.dto';
import { CurrentUser } from 'src/decorators';

import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ExpenseCategoryEntity } from './entities/expense-category.entity';

@Controller('expense-category')
@ApiTags('Expense Category')
export class ExpenseCategoryController {
  constructor(private expenseCategoryService: ExpenseCategoryService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: ExpenseCategoryEntity })
  create(
    @CurrentUser('id') id: number,
    @Body() createExpenseCategoryDto: CreateExpenseCategoryDto,
  ) {
    return this.expenseCategoryService.create(id, createExpenseCategoryDto);
  }

  @Get()
  @ApiCreatedResponse({ type: ExpenseCategoryEntity, isArray: true })
  findAll() {
    return this.expenseCategoryService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: ExpenseCategoryEntity })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.expenseCategoryService.findById(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: ExpenseCategoryEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExpenseCategoryDto: UpdateExpenseCategoryDto,
  ) {
    return this.expenseCategoryService.update(id, updateExpenseCategoryDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: ExpenseCategoryEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.expenseCategoryService.remove(id);
  }
}
