import authServices from "@/services/auth.service";
import { IResetPassword } from "@/types/Auth";
import { ApiAxiosError } from "@/types/Axios";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const forgotPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password minimal 6 karakter")
    .required("Password tidak boleh kosong"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Konfirmasi password tidak sama")
    .required("Konfirmasi password wajib diisi"),
});

const useResetPassword = () => {
  const router = useRouter();
  const code = router.query.code as string;
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisible = () => setIsVisible(!isVisible);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const resetPasswordService = async (
    code: string,
    payload: IResetPassword,
  ) => {
    const result = await authServices.resetPassword(code, payload);
    return result;
  };

  const { mutate: mutateResetPassword, isPending: isPendingResetPassword } =
    useMutation({
      mutationFn: (data: IResetPassword) => resetPasswordService(code, data),
      onError: (error: ApiAxiosError) => {
        addToast({
          title: "Gagal ubah password",
          description:
            error?.response?.data?.errors ||
            error?.response?.data?.message ||
            "Terjadi kesalahan server.",
          color: "danger",
          variant: "solid",
          timeout: 3000,
        });
      },
      onSuccess: () => {
        addToast({
          title: "Berhasil",
          description: "Password kamu berhasil diubah!",
          color: "success",
          variant: "solid",
          timeout: 3000,
        });
        reset();
        router.push("/auth/login");
      },
    });

  const handleResetPassword = (data: IResetPassword) =>
    mutateResetPassword({ password: data.password });

  return {
    control,
    handleSubmit,
    errors,
    handleResetPassword,
    isPendingResetPassword,
    isVisible,
    toggleVisible,
  };
};

export default useResetPassword;
