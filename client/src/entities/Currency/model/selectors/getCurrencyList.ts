import { type StateSchema } from '@/shared/types/StateSchema';

export const getCurrencyList = (state: StateSchema) => state.currencies.data;
