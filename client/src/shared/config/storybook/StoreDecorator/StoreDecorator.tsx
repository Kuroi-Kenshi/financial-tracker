import { StoreProvider } from '@/app/providers/StoreProvider';
import { type StateSchema } from '@/shared/types/StateSchema';
import { type DeepPartial } from '@reduxjs/toolkit';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
// @ts-ignore
// eslint-disable-next-line react/display-name
export const StoreDecorator = (state: DeepPartial<StateSchema>) => (StoryComponent) =>
  (
    <StoreProvider initialState={state}>
      <StoryComponent />
    </StoreProvider>
  );
