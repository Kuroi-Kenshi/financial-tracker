import { StateSchema } from '@/shared/types/StateSchema';

export const getExpenseCategoryError = (state: StateSchema) => state.expenseCategories.error;
