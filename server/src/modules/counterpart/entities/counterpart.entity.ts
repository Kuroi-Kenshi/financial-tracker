import { ApiProperty } from '@nestjs/swagger';
import { Counterpart } from '@prisma/client';

export class CounterpartEntity implements Counterpart {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  userId: number;
}
