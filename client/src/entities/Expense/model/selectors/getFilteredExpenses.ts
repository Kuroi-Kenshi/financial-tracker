import { type StateSchema } from '@/shared/types/StateSchema';

export const getFilteredExpenses = (state: StateSchema) => state.expenses.data.filtered;
