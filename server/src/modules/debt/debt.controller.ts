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
import { DebtService } from './debt.service';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { CurrentUser } from '../../decorators';

import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { DebtEntity } from './entities/debt.entity';

@Controller('debt')
@ApiTags('Debt')
export class DebtController {
  constructor(private debtService: DebtService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: DebtEntity })
  create(@CurrentUser('id') id: number, @Body() createDebtDto: CreateDebtDto) {
    return this.debtService.create(id, createDebtDto);
  }

  @Get()
  @ApiCreatedResponse({ type: DebtEntity, isArray: true })
  findAll() {
    return this.debtService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: DebtEntity })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.debtService.findById(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: DebtEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDebtDto: UpdateDebtDto,
  ) {
    return this.debtService.update(id, updateDebtDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: DebtEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.debtService.remove(id);
  }
}
