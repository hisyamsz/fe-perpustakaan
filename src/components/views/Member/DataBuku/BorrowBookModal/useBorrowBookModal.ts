import borrowServices from "@/services/borrow.service";
import { ApiAxiosError } from "@/types/Axios";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

const useBorrowBookModal = () => {
  const borrowBook = async (id: string | number) => {
    const result = await borrowServices.createBorrow({ buku_id: id });
    return result;
  };

  const {
    mutate: mutateBorrow,
    isPending: isPendingBorrow,
    isSuccess: isSuccessBorrow,
  } = useMutation({
    mutationFn: borrowBook,
    onError: (error: ApiAxiosError) => {
      addToast({
        title: "Gagal Meminjam Buku",
        description:
          error.response?.data?.errors ||
          error.response?.data?.errors ||
          "Terjadi kesalahan saat memproses peminjaman. Silakan coba lagi.",
        variant: "solid",
        color: "danger",
        timeout: 3000,
      });
    },
    onSuccess: () => {
      addToast({
        title: "Berhasil Meminjam Buku",
        description:
          "Peminjaman berhasil diajukan. Mohon menunggu proses persetujuan.",
        variant: "solid",
        color: "success",
        timeout: 3000,
      });
    },
  });

  const handleBorrowBook = (id: string | number) => mutateBorrow(id);

  return {
    handleBorrowBook,
    isPendingBorrow,
    isSuccessBorrow,
  };
};

export default useBorrowBookModal;
