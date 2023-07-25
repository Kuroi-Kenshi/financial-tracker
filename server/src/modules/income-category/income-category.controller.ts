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
import { CurrentUser } from '../../decorators';

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
    @CurrentUser('id') userId: number,
    @Body() createIncomeCategoryDto: CreateIncomeCategoryDto,
  ) {
    return this.incomeCategoryService.create(userId, createIncomeCategoryDto);
  }

  @Get()
  @ApiCreatedResponse({ type: IncomeCategoryEntity, isArray: true })
  findAll(@CurrentUser('id') userId: number) {
    return this.incomeCategoryService.findAll(userId);
  }

  @Get(':id')
  @ApiCreatedResponse({ type: IncomeCategoryEntity })
  findById(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('id') userId: number,
  ) {
    return this.incomeCategoryService.findById(id, userId);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: IncomeCategoryEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('id') userId: number,
    @Body() updateIncomeCategoryDto: UpdateIncomeCategoryDto,
  ) {
    return this.incomeCategoryService.update(
      id,
      userId,
      updateIncomeCategoryDto,
    );
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: IncomeCategoryEntity })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('id') userId: number,
  ) {
    return this.incomeCategoryService.remove(id, userId);
  }
}
