import { ApiProperty } from '@nestjs/swagger';
import {
  Counterpart,
  Credit,
  Currency,
  DebtAndCreditStatus,
} from '@prisma/client';
import { Exclude } from 'class-transformer';

export class CreditEntity implements Credit {
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

  @ApiProperty()
  startDate: Date | null;

  @ApiProperty()
  dueDate: Date | null;

  @ApiProperty()
  status: DebtAndCreditStatus;

  @ApiProperty()
  totalPayments: number;

  @Exclude()
  @ApiProperty()
  creditorId: number;

  @Exclude()
  @ApiProperty()
  userId: number;

  @Exclude()
  @ApiProperty()
  currencyId: number;

  @ApiProperty()
  currency: Currency;

  @ApiProperty()
  creditor: Counterpart;

  constructor(partial: Partial<CreditEntity>) {
    Object.assign(this, partial);
  }
}
