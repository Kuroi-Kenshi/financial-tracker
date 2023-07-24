import { StateSchema } from '@/shared/types/StateSchema';

export const getExpenseIsLoading = (state: StateSchema) => state.expenses.isLoading;
