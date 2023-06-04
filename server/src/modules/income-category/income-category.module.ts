import { Module } from '@nestjs/common';
import { IncomeCategoryService } from './income-category.service';
import { IncomeCategoryController } from './income-category.controller';

@Module({
  controllers: [IncomeCategoryController],
  providers: [IncomeCategoryService],
})
export class IncomeCategoryModule {}
