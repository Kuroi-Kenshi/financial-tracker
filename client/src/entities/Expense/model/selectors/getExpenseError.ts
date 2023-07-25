import { StateSchema } from '@/shared/types/StateSchema';

export const getExpenseError = (state: StateSchema) => state.expenses.error;
