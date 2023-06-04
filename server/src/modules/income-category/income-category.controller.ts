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
import { IncomeCategoryService } from './income-category.service';
import { CreateIncomeCategoryDto } from './dto/create-income-category.dto';
import { UpdateIncomeCategoryDto } from './dto/update-income-category.dto';
import { CurrentUser } from 'src/decorators';

import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { IncomeCategoryEntity } from './entities/income-category.entity';

@Controller('income-category')
@ApiTags('Income Category')
export class IncomeCategoryController {
  constructor(private incomeCategoryService: IncomeCategoryService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: IncomeCategoryEntity })
  create(
    @CurrentUser('id') id: number,
    @Body() createIncomeCategoryDto: CreateIncomeCategoryDto,
  ) {
    return this.incomeCategoryService.create(id, createIncomeCategoryDto);
  }

  @Get()
  @ApiCreatedResponse({ type: IncomeCategoryEntity, isArray: true })
  findAll() {
    return this.incomeCategoryService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: IncomeCategoryEntity })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.incomeCategoryService.findById(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: IncomeCategoryEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateIncomeCategoryDto: UpdateIncomeCategoryDto,
  ) {
    return this.incomeCategoryService.update(id, updateIncomeCategoryDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: IncomeCategoryEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.incomeCategoryService.remove(id);
  }
}
