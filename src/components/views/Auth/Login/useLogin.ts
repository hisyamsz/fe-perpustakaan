import { ILogin } from "@/types/Auth";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Format email tidak valid")
    .required("Email tidak boleh kosong"),
  password: yup.string().required("Password tidak boleh kosong"),
});

const useLogin = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisible = () => setIsVisible(!isVisible);

  const callbackUrl: string = (router.query.callbackUrl as string) || "/";

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const loginService = async (payload: ILogin) => {
    const result = await signIn("credentials", {
      ...payload,
      redirect: false,
      callbackUrl,
    });

    if (result?.error && result?.status === 401) {
      throw new Error("Email atau password salah");
    }

    return result;
  };

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: loginService,
    onError: (error) => {
      addToast({
        title: "Login gagal",
        description: error.message,
        color: "danger",
        variant: "solid",
        timeout: 3000,
      });
    },
    onSuccess: () => {
      addToast({
        title: "Login berhasil",
        description: "Selamat datang kembali!",
        color: "success",
        variant: "solid",
        timeout: 3000,
      });
      reset();
      router.push(callbackUrl);
    },
  });

  const handleLogin = (data: ILogin) => mutateLogin(data);
  return {
    isVisible,
    toggleVisible,
    control,
    handleSubmit,
    errors,
    handleLogin,
    isPendingLogin,
  };
};

export default useLogin;
