import { addToast } from "@heroui/react";
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
    addToast({
      title: "Sesi Berakhir",
      description:
        "Sesi login Anda telah habis. Silakan masuk kembali untuk melanjutkan.",
      color: "warning",
    });
  }
};
