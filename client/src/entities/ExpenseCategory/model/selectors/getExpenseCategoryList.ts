import { StateSchema } from '@/shared/types/StateSchema';

export const getExpenseCategoryList = (state: StateSchema) => state.expenseCategories?.data;
