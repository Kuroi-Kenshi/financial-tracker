import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
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
import { BudgetPlanService } from './budget-plan.service';
import { CreateBudgetPlanDto } from './dto/create-budget-plan.dto';
import { UpdateBudgetPlanDto } from './dto/update-budget-plan.dto';
import { CurrentUser } from '../../decorators';

import { BudgetPlanEntity } from './entities/budget-plan.entity';

@Controller('budget-plan')
@ApiTags('Budget Plan')
export class BudgetPlanController {
  constructor(private budgetPlanService: BudgetPlanService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: BudgetPlanEntity })
  create(
    @CurrentUser('id') id: number,
    @Body() createBudgetPlanDto: CreateBudgetPlanDto,
  ) {
    return this.budgetPlanService.create(id, createBudgetPlanDto);
  }

  @Get()
  @ApiCreatedResponse({ type: BudgetPlanEntity, isArray: true })
  findAll() {
    return this.budgetPlanService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: BudgetPlanEntity })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.budgetPlanService.findById(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: BudgetPlanEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBudgetPlanDto: UpdateBudgetPlanDto,
  ) {
    return this.budgetPlanService.update(id, updateBudgetPlanDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: BudgetPlanEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.budgetPlanService.remove(id);
  }
}
