import { IsNumber, IsString } from 'class-validator';

export class CreateReceiptDto {
  @IsString()
  originalName: string;

  @IsString()
  name: string;

  @IsNumber()
  size: number;

  @IsString()
  mimetype: string;

  @IsString()
  filePath: string;
}
