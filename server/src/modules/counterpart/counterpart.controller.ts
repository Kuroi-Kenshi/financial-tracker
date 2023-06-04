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
import { CurrentUser } from 'src/decorators';

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
    @CurrentUser('id') id: number,
    @Body() createCounterpartDto: CreateCounterpartDto,
  ) {
    return this.counterpartService.create(id, createCounterpartDto);
  }

  @Get()
  @ApiCreatedResponse({ type: CounterpartEntity, isArray: true })
  findAll() {
    return this.counterpartService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: CounterpartEntity })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.counterpartService.findById(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: CounterpartEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCounterpartDto: UpdateCounterpartDto,
  ) {
    return this.counterpartService.update(id, updateCounterpartDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: CounterpartEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.counterpartService.remove(id);
  }
}
