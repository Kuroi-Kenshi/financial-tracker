import { Module } from '@nestjs/common';
import { InvestmentCategoryService } from './investment-category.service';
import { InvestmentCategoryController } from './investment-category.controller';

@Module({
  controllers: [InvestmentCategoryController],
  providers: [InvestmentCategoryService],
})
export class InvestmentCategoryModule {}
