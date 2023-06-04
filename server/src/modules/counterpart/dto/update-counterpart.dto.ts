import { PartialType } from '@nestjs/swagger';
import { CreateCounterpartDto } from './create-counterpart.dto';

export class UpdateCounterpartDto extends PartialType(CreateCounterpartDto) {}
