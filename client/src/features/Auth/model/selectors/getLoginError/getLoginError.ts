import { StateSchema } from '@/shared/types/StateSchema';

export const getLoginError = (state: StateSchema) => state.auth?.error;
