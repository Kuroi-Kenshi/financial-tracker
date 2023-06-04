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
import { InvestmentCategoryService } from './investment-category.service';
import { CreateInvestmentCategoryDto } from './dto/create-investment-category.dto';
import { UpdateInvestmentCategoryDto } from './dto/update-investment-category.dto';
import { CurrentUser } from 'src/decorators';

import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { InvestmentCategoryEntity } from './entities/investment-category.entity';

@Controller('investment-category')
@ApiTags('Investment Category')
export class InvestmentCategoryController {
  constructor(private investmentCategoryService: InvestmentCategoryService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: InvestmentCategoryEntity })
  create(
    @CurrentUser('id') id: number,
    @Body() createInvestmentCategoryDto: CreateInvestmentCategoryDto,
  ) {
    return this.investmentCategoryService.create(
      id,
      createInvestmentCategoryDto,
    );
  }

  @Get()
  @ApiCreatedResponse({ type: InvestmentCategoryEntity, isArray: true })
  findAll() {
    return this.investmentCategoryService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: InvestmentCategoryEntity })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.investmentCategoryService.findById(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: InvestmentCategoryEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInvestmentCategoryDto: UpdateInvestmentCategoryDto,
  ) {
    return this.investmentCategoryService.update(
      id,
      updateInvestmentCategoryDto,
    );
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: InvestmentCategoryEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.investmentCategoryService.remove(id);
  }
}
