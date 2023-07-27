import { type StateSchema } from '@/shared/types/StateSchema';

export const getIncomeError = (state: StateSchema) => state.incomes.error;
