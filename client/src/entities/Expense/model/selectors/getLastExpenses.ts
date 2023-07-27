import { type StateSchema } from '@/shared/types/StateSchema';

export const getLastExpenses = (state: StateSchema) => state.expenses.data.last;
