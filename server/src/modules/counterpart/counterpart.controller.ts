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
import { CounterpartService } from './counterpart.service';
import { CreateCounterpartDto } from './dto/create-counterpart.dto';
import { UpdateCounterpartDto } from './dto/update-counterpart.dto';
import { CurrentUser } from '../../decorators';

import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CounterpartEntity } from './entities/counterpart.entity';

@Controller('Counterpart')
@ApiTags('Counterpart')
export class CounterpartController {
  constructor(private counterpartService: CounterpartService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: CounterpartEntity })
  create(
    @CurrentUser('id') userId: number,
    @Body() createCounterpartDto: CreateCounterpartDto,
  ) {
    return this.counterpartService.create(userId, createCounterpartDto);
  }

  @Get()
  @ApiCreatedResponse({ type: CounterpartEntity, isArray: true })
  findAll(@CurrentUser('id') userId: number) {
    return this.counterpartService.findAll(userId);
  }

  @Get(':id')
  @ApiCreatedResponse({ type: CounterpartEntity })
  findById(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('id') userId: number,
  ) {
    return this.counterpartService.findById(id, userId);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: CounterpartEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('id') userId: number,
    @Body() updateCounterpartDto: UpdateCounterpartDto,
  ) {
    return this.counterpartService.update(id, userId, updateCounterpartDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: CounterpartEntity })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('id') userId: number,
  ) {
    return this.counterpartService.remove(id, userId);
  }
}
