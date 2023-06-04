import { DebtAndCreditStatus } from '@prisma/client';

export const credit = [
  {
    description: 'Долг по кредитной карте',
    amount: 5000.0,
    dueDate: new Date(),
    status: DebtAndCreditStatus.ACTIVE,
    totalPayments: 0.0,
    creditorId: 1,
    userId: 1,
    currencyId: 4,
  },
];
