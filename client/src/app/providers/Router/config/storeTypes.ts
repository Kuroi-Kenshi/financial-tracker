import { AxiosInstance } from "axios";
import { NavigateFunction } from "react-router-dom";

export interface ThunkExtraArgs {
  api: AxiosInstance;
  navigate: NavigateFunction;
}