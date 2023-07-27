import { type StateSchema } from '@/shared/types/StateSchema';

export const getExpenseCategoryWithLimits = (state: StateSchema) =>
  state.expenseCategories?.data.filter((category) => category.limitPerMonth);
