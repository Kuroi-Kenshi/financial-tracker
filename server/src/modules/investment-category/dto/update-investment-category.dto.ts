import { PartialType } from '@nestjs/swagger';
import { CreateInvestmentCategoryDto } from './create-investment-category.dto';

export class UpdateInvestmentCategoryDto extends PartialType(
  CreateInvestmentCategoryDto,
) {}
