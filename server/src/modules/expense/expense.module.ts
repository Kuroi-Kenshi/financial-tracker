import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { ExpenseCategoryModule } from '../expense-category/expense-category.module';

@Module({
  controllers: [ExpenseController],
  providers: [ExpenseService],
  imports: [ExpenseCategoryModule],
})
export class ExpenseModule {}
