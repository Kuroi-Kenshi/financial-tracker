import { StoreProvider } from '@/app/providers/StoreProvider';
import { StateSchema } from '@/shared/types/StateSchema';
import { DeepPartial } from '@reduxjs/toolkit';

//@ts-ignore
export const StoreDecorator = (state: DeepPartial<StateSchema>) => (StoryComponent) =>
  (
    <StoreProvider initialState={state}>
      <StoryComponent />
    </StoreProvider>
  );
