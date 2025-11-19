import borrowServices from "@/services/borrow.service";
import { ApiAxiosError } from "@/types/Axios";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

const usePeminjamanReturnModal = () => {
  const rejectBorrow = async (id: string) => {
    const result = await borrowServices.rejectBorrow(id);
    return result;
  };

  const {
    mutate: mutateRejectBorrow,
    isPending: isPendingRejectBorrow,
    isSuccess: isSuccessRejectBorrow,
  } = useMutation({
    mutationFn: rejectBorrow,
    onError: (error: ApiAxiosError) => {
      addToast({
        title: "Gagal Menolak",
        description:
          error.response?.data?.message ??
          "Terjadi kesalahan saat menolak peminjaman.",
        color: "danger",
      });
    },
    onSuccess: () => {
      addToast({
        title: "Peminjaman Ditolak!",
        description: "Permintaan peminjaman berhasil ditolak.",
        color: "success",
      });
    },
  });

  return {
    mutateRejectBorrow,
    isPendingRejectBorrow,
    isSuccessRejectBorrow,
  };
};

export default usePeminjamanReturnModal;
