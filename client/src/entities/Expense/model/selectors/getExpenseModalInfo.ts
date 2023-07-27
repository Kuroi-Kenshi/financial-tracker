import { type StateSchema } from '@/shared/types/StateSchema';

export const getExpenseModalInfo = (state: StateSchema) => state.expenses.modalInfo;
