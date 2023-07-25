import { StateSchema } from '@/shared/types/StateSchema';

export const getIncomeCategoryError = (state: StateSchema) => state.incomeCategories.error;
