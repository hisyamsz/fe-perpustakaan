import bookServices from "@/services/book.service";
import { ApiAxiosError } from "@/types/Axios";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

const useDeleteDataBukuModal = () => {
  const deleteBook = async (id: string) => {
    const result = await bookServices.deleteBook(id);
    return result;
  };

  const {
    mutate: mutateDeleteDataBuku,
    isPending: isPendingDeleteDataBuku,
    isSuccess: isSuccessDeleteDataBuku,
  } = useMutation({
    mutationFn: deleteBook,
    onError: (error: ApiAxiosError) => {
      addToast({
        title: "Gagal Menghapus Data Buku",
        description:
          error?.response?.data?.errors ||
          error?.response?.data?.message ||
          "Terjadi kesalahan saat menghapus data buku. Silakan coba lagi.",
        variant: "solid",
        color: "danger",
        timeout: 3000,
      });
    },
    onSuccess: () => {
      addToast({
        title: "Berhasil Menghapus Buku",
        description: "Data buku telah berhasil dihapus.",
        variant: "solid",
        color: "success",
        timeout: 3000,
      });
    },
  });

  return {
    mutateDeleteDataBuku,
    isPendingDeleteDataBuku,
    isSuccessDeleteDataBuku,
  };
};

export default useDeleteDataBukuModal;
