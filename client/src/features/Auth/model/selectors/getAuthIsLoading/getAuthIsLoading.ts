import { StateSchema } from '@/shared/types/StateSchema';

export const getAuthIsLoading = (state: StateSchema) => state?.login?.isLoading || false;
