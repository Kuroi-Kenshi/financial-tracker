import { PartialType } from '@nestjs/swagger';
import { CreateIncomeCategoryDto } from './create-income-category.dto';

export class UpdateIncomeCategoryDto extends PartialType(
  CreateIncomeCategoryDto,
) {}
