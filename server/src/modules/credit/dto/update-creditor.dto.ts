import { PartialType } from '@nestjs/swagger';
import { CreateCreditDto } from './create-creditor.dto';

export class UpdateCreditDto extends PartialType(CreateCreditDto) {}
