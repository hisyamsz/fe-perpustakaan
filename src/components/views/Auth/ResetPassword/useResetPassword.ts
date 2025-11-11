import authServices from "@/services/auth.service";
import { IResetPassword } from "@/types/Auth";
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
  const token = router.query.token as string;
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
    token: string,
    payload: IResetPassword,
  ) => {
    const result = await authServices.resetPassword(token, payload);
    return result;
  };

  const { mutate: mutateResetPassword, isPending: isPendingResetPassword } =
    useMutation({
      mutationFn: (data: IResetPassword) => resetPasswordService(token, data),
      onError: () => {
        addToast({
          title: "Gagal ubah password",
          description: "Terjadi kesalahan server.",
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
