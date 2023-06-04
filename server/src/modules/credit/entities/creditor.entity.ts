import { ApiProperty } from '@nestjs/swagger';
import { Credit, DebtAndCreditStatus } from '@prisma/client';

export class CreditEntity implements Credit {
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
  creditorId: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  currencyId: number;
}
