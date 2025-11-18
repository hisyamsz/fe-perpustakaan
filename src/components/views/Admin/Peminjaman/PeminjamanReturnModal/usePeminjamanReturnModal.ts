import borrowServices from "@/services/borrow.service";
import { ApiAxiosError } from "@/types/Axios";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const usePeminjamanReturnModal = () => {
  const [kondisi, setKondisi] = useState<string>("Baik");

  const {
    mutate: mutateReturnBorrow,
    isPending: isPendingReturnBorrow,
    isSuccess: isSuccessReturnBorrow,
  } = useMutation({
    mutationFn: async ({
      id,
      kondisi_buku,
    }: {
      id: string | number;
      kondisi_buku: string;
    }) => {
      return await borrowServices.returnBorrow(id, { kondisi_buku });
    },
    onError: (error: ApiAxiosError) => {
      addToast({
        title: "Gagal Mengembalikan Buku",
        description: error.response?.data?.message ?? "Terjadi kesalahan.",
        color: "danger",
      });
    },
    onSuccess: () => {
      addToast({
        title: "Berhasil!",
        description: "Data pengembalian telah disimpan.",
        color: "success",
      });
    },
  });

  return {
    mutateReturnBorrow,
    isPendingReturnBorrow,
    isSuccessReturnBorrow,
    kondisi,
    setKondisi,
  };
};

export default usePeminjamanReturnModal;
