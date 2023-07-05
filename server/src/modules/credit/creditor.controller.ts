import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
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
import { CurrentUser } from '../../decorators';

import { CreditEntity } from './entities/creditor.entity';
import { CreateCreditDto } from './dto/create-creditor.dto';
import { UpdateCreditDto } from './dto/update-creditor.dto';
import { CreditService } from './creditor.service';

@Controller('credit')
@ApiTags('Credit')
export class CreditController {
  constructor(private creditService: CreditService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: CreditEntity })
  create(
    @CurrentUser('id') userId: number,
    @Body() createCreditDto: CreateCreditDto,
  ) {
    return this.creditService.create(userId, createCreditDto);
  }

  @Get()
  @ApiCreatedResponse({ type: CreditEntity, isArray: true })
  findAll(@CurrentUser('id') userId: number) {
    return this.creditService.findAll(userId);
  }

  @Get(':id')
  @ApiCreatedResponse({ type: CreditEntity })
  findById(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('id') userId: number,
  ) {
    return this.creditService.findById(id, userId);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: CreditEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('id') userId: number,
    @Body() updateCreditDto: UpdateCreditDto,
  ) {
    return this.creditService.update(id, userId, updateCreditDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: CreditEntity })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('id') userId: number,
  ) {
    return this.creditService.remove(id, userId);
  }
}
