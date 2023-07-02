import {
  Controller,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CurrencyService } from './currency.service';
import { CurrencyEntity } from './entities/currency.entity';

@Controller('currency')
@ApiTags('Currency')
@UseInterceptors(ClassSerializerInterceptor)
export class CurrencyController {
  constructor(private currencyService: CurrencyService) {}

  @Get()
  @ApiCreatedResponse({ type: CurrencyEntity, isArray: true })
  async findAll() {
    return await this.currencyService.findAll();
  }
}
