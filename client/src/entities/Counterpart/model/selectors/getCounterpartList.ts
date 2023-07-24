import { StateSchema } from '@/shared/types/StateSchema';

export const getCounterpartList = (state: StateSchema) => state.counterpart?.data;
