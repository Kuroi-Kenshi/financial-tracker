import { StateSchema } from '@/shared/types/StateSchema';

export const getExpenses = (state: StateSchema) => state.expenses.data;
