import { DebtAndCreditStatus } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Counterpart, Currency, Debt } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class DebtEntity implements Debt {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  amount: number;

  @Exclude()
  @ApiProperty()
  createdAt: Date;

  @Exclude()
  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ default: '2023-05-16T19:20:30.451Z' })
  startDate: Date | null;

  @ApiProperty({ default: '2023-05-16T19:20:30.451Z' })
  dueDate: Date | null;

  @ApiProperty()
  status: DebtAndCreditStatus;

  @ApiProperty()
  totalPayments: number;

  @Exclude()
  @ApiProperty()
  debtorId: number;

  @Exclude()
  @ApiProperty()
  userId: number;

  @Exclude()
  @ApiProperty()
  currencyId: number;

  @ApiProperty()
  currency: Currency;

  @ApiProperty()
  debtor: Counterpart;

  constructor(partial: Partial<DebtEntity>) {
    Object.assign(this, partial);
  }
}
