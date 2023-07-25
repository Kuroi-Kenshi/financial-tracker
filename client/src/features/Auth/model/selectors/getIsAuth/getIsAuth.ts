import { StateSchema } from '@/shared/types/StateSchema';

export const getIsAuth = (state: StateSchema) => state?.user?.isAuth;
