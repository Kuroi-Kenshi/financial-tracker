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
import { InvestmentService } from './investment.service';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
import { CurrentUser } from 'src/decorators';

import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { InvestmentEntity } from './entities/investment.entity';

@Controller('investment')
@ApiTags('Investment')
export class InvestmentController {
  constructor(private investmentService: InvestmentService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: InvestmentEntity })
  create(
    @CurrentUser('id') id: number,
    @Body() createInvestmentDto: CreateInvestmentDto,
  ) {
    return this.investmentService.create(id, createInvestmentDto);
  }

  @Get()
  @ApiCreatedResponse({ type: InvestmentEntity, isArray: true })
  findAll() {
    return this.investmentService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: InvestmentEntity })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.investmentService.findById(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: InvestmentEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInvestmentDto: UpdateInvestmentDto,
  ) {
    return this.investmentService.update(id, updateInvestmentDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: InvestmentEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.investmentService.remove(id);
  }
}
