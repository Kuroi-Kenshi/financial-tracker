import { ApiProperty } from '@nestjs/swagger';
import { UserBalance } from '@prisma/client';

export class UserBalanceEntity implements UserBalance {
  @ApiProperty()
  id: number;

  @ApiProperty()
  balance: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  currencyId: number;
}
