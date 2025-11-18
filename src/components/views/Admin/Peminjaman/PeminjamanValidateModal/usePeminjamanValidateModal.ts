import borrowServices from "@/services/borrow.service";
import { ApiAxiosError } from "@/types/Axios";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

const usePeminjamanValidateModal = () => {
  const validateBorrow = async (id: string) => {
    const result = await borrowServices.validateBorrow(id);
    return result;
  };

  const {
    mutate: mutateBorrowBook,
    isPending: isPendingBorrowBook,
    isSuccess: isSuccessBorrowBook,
  } = useMutation({
    mutationFn: validateBorrow,
    onError: (error: ApiAxiosError) => {
      addToast({
        title: "Gagal Memvalidasi",
        description:
          error?.response?.data?.message ||
          "Terjadi kesalahan saat memvalidasi peminjaman.",
        color: "danger",
      });
    },
    onSuccess: () => {
      addToast({
        title: "Peminjaman Divalidasi",
        description: "Peminjaman berhasil divalidasi.",
        color: "success",
      });
    },
  });

  return {
    mutateBorrowBook,
    isPendingBorrowBook,
    isSuccessBorrowBook,
  };
};

export default usePeminjamanValidateModal;
