import { StateSchema } from '@/shared/types/StateSchema';

export const getCredits = (state: StateSchema) => state.credits?.data;
