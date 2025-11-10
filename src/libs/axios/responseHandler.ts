import type { AxiosError } from "axios";
import { signOut } from "next-auth/react";

interface ErrorResponseData {
  data: {
    jwtError: string;
  };
}

export const onErrorHandler = (error: Error) => {
  const { response } = error as AxiosError;
  const res = response?.data as ErrorResponseData;

  if (response && res?.data?.jwtError === "jwt expired") {
    signOut();
  }
};
