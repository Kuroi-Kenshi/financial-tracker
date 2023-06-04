import { ApiProperty } from '@nestjs/swagger';
import { Receipt } from '@prisma/client';

export class ReceiptEntity implements Receipt {
  @ApiProperty()
  id: number;

  @ApiProperty()
  originalName: string;

  @ApiProperty()
  fileName: string;

  @ApiProperty()
  size: number;

  @ApiProperty()
  mimetype: string;

  @ApiProperty()
  filePath: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  expenseId: number;
}
