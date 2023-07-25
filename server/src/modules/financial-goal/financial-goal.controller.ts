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
import { FinancialGoalService } from './financial-goal.service';
import { CreateFinancialGoalDto } from './dto/create-financial-goal.dto';
import { UpdateFinancialGoalDto } from './dto/update-financial-goal.dto';
import { CurrentUser } from '../../decorators';

import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { FinancialGoalEntity } from './entities/financial-goal.entity';

@Controller('financial-goal')
@ApiTags('Financial Goals')
export class FinancialGoalController {
  constructor(private financialGoalService: FinancialGoalService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: FinancialGoalEntity })
  create(
    @CurrentUser('id') userId: number,
    @Body() createFinancialGoalDto: CreateFinancialGoalDto,
  ) {
    return this.financialGoalService.create(userId, createFinancialGoalDto);
  }

  @Get()
  @ApiCreatedResponse({ type: FinancialGoalEntity, isArray: true })
  findAll(@CurrentUser('id') userId: number) {
    return this.financialGoalService.findAll(userId);
  }

  @Get(':id')
  @ApiCreatedResponse({ type: FinancialGoalEntity })
  findById(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('id') userId: number,
  ) {
    return this.financialGoalService.findById(id, userId);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: FinancialGoalEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('id') userId: number,
    @Body() updateFinancialGoalDto: UpdateFinancialGoalDto,
  ) {
    return this.financialGoalService.update(id, userId, updateFinancialGoalDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: FinancialGoalEntity })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('id') userId: number,
  ) {
    return this.financialGoalService.remove(id, userId);
  }
}
