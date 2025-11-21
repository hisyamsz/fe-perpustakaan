import borrowServices from "@/services/borrow.service";
import { ApiAxiosError } from "@/types/Axios";
import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useBorrowBookModal = () => {
  const queryClient = useQueryClient();

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
        color: "danger",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["MemberPeminjaman"] });
      queryClient.invalidateQueries({ queryKey: ["UserSummary"] });
      queryClient.invalidateQueries({ queryKey: ["Statistic"] });
      addToast({
        title: "Berhasil Meminjam Buku",
        description:
          "Peminjaman berhasil diajukan. Mohon menunggu proses persetujuan.",
        color: "success",
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
