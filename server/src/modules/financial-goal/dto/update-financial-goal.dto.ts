import { PartialType } from '@nestjs/swagger';
import { CreateFinancialGoalDto } from './create-financial-goal.dto';

export class UpdateFinancialGoalDto extends PartialType(
  CreateFinancialGoalDto,
) {}
