import { StateSchema } from '@/shared/types/StateSchema';

export const getFinancialGoalList = (state: StateSchema) => state.financialGoal.data;
