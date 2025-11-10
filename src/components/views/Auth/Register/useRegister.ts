import authServices from "@/services/auth.service";
import { IRegister } from "@/types/Auth";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const registerSchema = yup.object().shape({
  nama: yup.string().required("Nama tidak boleh kosong"),
  email: yup
    .string()
    .email("Format email tidak valid")
    .required("Email tidak boleh kosong"),
  password: yup
    .string()
    .min(8, "Password minimal 8 karakter")
    .required("Password tidak boleh kosong"),
  role: yup.string().default("user"),
});

const useRegister = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisible = () => setIsVisible(!isVisible);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const registerService = async (payload: IRegister) => {
    const result = await authServices.register(payload);
    return result;
  };

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: registerService,
    onError: () => {
      addToast({
        title: "Register gagal",
        description: "Email sudah terdaftar. Silakan coba lagi.",
        color: "danger",
        variant: "solid",
        timeout: 3000,
      });
    },
    onSuccess: () => {
      addToast({
        title: "Register berhasil",
        description:
          "Akun Anda berhasil dibuat. Silakan aktivasi untuk melanjutkan.",
        color: "success",
        variant: "solid",
        timeout: 3000,
      });
      reset();
      router.push("/auth/register/success");
    },
  });

  const handleRegister = (data: IRegister) => mutateRegister(data);

  return {
    isVisible,
    toggleVisible,
    control,
    handleSubmit,
    errors,
    reset,
    handleRegister,
    isPendingRegister,
  };
};

export default useRegister;
