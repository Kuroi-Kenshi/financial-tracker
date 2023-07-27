import { type AxiosInstance } from 'axios';
import { type NavigateFunction } from 'react-router-dom';

export interface ThunkExtraArgs {
  api: AxiosInstance;
  navigate: NavigateFunction;
}
