import { Module } from '@nestjs/common';
import { ExpenseCategoryService } from './expense-category.service';
import { ExpenseCategoryController } from './expense-category.controller';

@Module({
  controllers: [ExpenseCategoryController],
  providers: [ExpenseCategoryService],
})
export class ExpenseCategoryModule {}
