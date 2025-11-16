import { AxiosError } from "axios";

export interface ApiErrorResponse {
  errors?: string;
  message?: string;
}

export type ApiAxiosError = AxiosError<ApiErrorResponse>;
