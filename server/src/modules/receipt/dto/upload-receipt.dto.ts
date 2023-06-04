import { IsNumber } from 'class-validator';

export class UploadReceiptDto {
  @IsNumber()
  expenseId: number;
}
