import { type StateSchema } from '@/shared/types/StateSchema';

export const getIncomeCategoryList = (state: StateSchema) => state.incomeCategories.data;
