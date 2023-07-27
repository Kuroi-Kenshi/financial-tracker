import { type StateSchema } from '@/shared/types/StateSchema';

export const getDebts = (state: StateSchema) => state.debts?.data || [];
