import authServices from "@/services/auth.service";
import { IForgotPasswordEmail } from "@/types/Auth";
import { ApiAxiosError } from "@/types/Axios";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Format email tidak valid")
    .required("Email tidak boleh kosong"),
});

const useForgotPassword = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  // 🔹 Memanggil endpoint backend untuk forgot password
  const forgotPasswordService = async (payload: IForgotPasswordEmail) => {
    const result = await authServices.forgotPasswordEmail(payload);
    return result;
  };

  const { mutate: mutateForgotPassword, isPending: isPendingForgotPassword } =
    useMutation({
      mutationFn: forgotPasswordService,
      onError: (error: ApiAxiosError) => {
        addToast({
          title: "Gagal mengirim link reset password",
          description:
            error?.response?.data?.errors ||
            error?.response?.data?.message ||
            "Terjadi kesalahan saat mengirim link. Silakan coba lagi.",
          color: "danger",
        });
      },
      onSuccess: () => {
        addToast({
          title: "Link reset password dikirim",
          description:
            "Silakan cek email Anda untuk mengatur ulang password. Link berlaku selama 1 jam.",
          color: "success",
        });
        reset();
        router.push("/");
      },
    });

  const handleForgotPassword = (data: IForgotPasswordEmail) =>
    mutateForgotPassword(data);

  return {
    control,
    handleSubmit,
    errors,
    handleForgotPassword,
    isPendingForgotPassword,
  };
};

export default useForgotPassword;
