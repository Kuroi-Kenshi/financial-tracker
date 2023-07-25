import { DebtAndCreditStatus } from '@prisma/client';

export const credit = [
  {
    name: 'Долг по кредитной карте',
    description: 'Долг по кредитной карте',
    amount: 5000.0,
    startDate: new Date(),
    dueDate: new Date(),
    status: DebtAndCreditStatus.ACTIVE,
    totalPayments: 0.0,
    creditorId: 1,
    userId: 1,
    currencyId: 4,
  },
];
