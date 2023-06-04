import { DebtAndCreditStatus } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Debt } from '@prisma/client';

export class DebtEntity implements Debt {
  @ApiProperty()
  id: number;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  dueDate: Date | null;

  @ApiProperty()
  status: DebtAndCreditStatus;

  @ApiProperty()
  totalPayments: number;

  @ApiProperty()
  debtorId: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  currencyId: number;
}
