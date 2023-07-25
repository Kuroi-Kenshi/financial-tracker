import { DebtAndCreditStatus } from '@prisma/client';

export const debt = [
  {
    name: 'Одолжил денег на машину',
    description: 'Одолжил денег на машину',
    amount: 10000.0,
    startDate: new Date(),
    dueDate: new Date(),
    status: DebtAndCreditStatus.ACTIVE,
    totalPayments: 0.0,
    debtorId: 2,
    userId: 1,
    currencyId: 4,
  },
];
