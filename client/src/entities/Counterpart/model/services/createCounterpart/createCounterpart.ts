import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { Counterpart } from '../../types/counterpartSchema';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export const createCounterpart = createAsyncThunk<
  Counterpart,
  Omit<Counterpart, 'id'>,
  ThunkConfig<string>
>('counterpart/create', async (newCounterpart, { extra, dispatch, rejectWithValue }) => {
  try {
    const response = await extra.api.post<Counterpart>('counterpart123', newCounterpart);

    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return rejectWithValue(errorMessage);
  }
});
