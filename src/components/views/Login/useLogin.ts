import { ILogin } from "@/types/Auth";
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
    .required("Masukkan email anda"),
  password: yup.string().required("Masukkan password anda"),
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
    setError,
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
      throw new Error("Email tidak cocok dengan password anda");
    }

    return result;
  };

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: loginService,
    onError: (error) => {
      setError("root", {
        message: error.message,
      });
    },
    onSuccess: () => {
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
