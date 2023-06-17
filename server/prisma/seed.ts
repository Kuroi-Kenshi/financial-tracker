import { PrismaClient } from '@prisma/client';
import {
  budgetPlan,
  counterpart,
  credit,
  currencies,
  debt,
  expense,
  expenseCategory,
  financialGoal,
  income,
  incomeCategory,
  investment,
  investmentCategory,
  receipt,
  user,
  userBalance,
} from './seedData';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: user,
  });
  await prisma.currency.createMany({
    data: currencies,
  });
  await prisma.userBalance.createMany({
    data: userBalance,
  });
  await prisma.expenseCategory.createMany({
    data: expenseCategory,
  });
  await prisma.expense.createMany({
    data: expense,
  });
  await prisma.incomeCategory.createMany({
    data: incomeCategory,
  });
  await prisma.income.createMany({
    data: income,
  });
  await prisma.counterpart.createMany({
    data: counterpart,
  });
  await prisma.debt.createMany({
    data: debt,
  });
  await prisma.credit.createMany({
    data: credit,
  });
  await prisma.investmentCategory.createMany({
    data: investmentCategory,
  });
  await prisma.investment.createMany({
    data: investment,
  });
  await prisma.financialGoal.createMany({
    data: financialGoal,
  });
  await prisma.budgetPlan.createMany({
    data: budgetPlan,
  });
  await prisma.receipt.createMany({
    data: receipt,
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
