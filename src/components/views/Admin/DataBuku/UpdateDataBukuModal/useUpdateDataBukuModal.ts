import bookServices from "@/services/book.service";
import { ApiAxiosError } from "@/types/Axios";
import { IBook } from "@/types/Book";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const currentYear = new Date().getFullYear();

const updateBookSchema = yup.object().shape({
  judul: yup.string().required("Judul buku wajib diisi"),
  penulis: yup.string().required("Nama penulis wajib diisi"),
  kategori: yup.string().required("Kategori buku wajib diisi"),
  penerbit: yup.string().required("Nama penerbit wajib diisi"),
  tahun_terbit: yup
    .string()
    .required("Tahun terbit wajib diisi")
    .max(4, "Tahun terbit harus berupa 4 angka")
    .matches(/^[0-9]{4}$/, "Tahun terbit harus berupa 4 angka")
    .test(
      "max-year",
      `Tahun terbit tidak boleh melebihi ${currentYear}`,
      (value) => {
        if (!value) return false;
        const year = parseInt(value, 10);
        return year <= currentYear;
      },
    ),
  buku_paket: yup
    .string()
    .required("Status buku paket wajib diisi")
    .oneOf(["true", "false"]),
  isFeatured: yup.string().required("Status unggulan wajib diisi (Ya/Tidak)"),
  stok: yup
    .string()
    .required("Jumlah stok wajib diisi")
    .matches(/^[0-9]+$/, "Stok harus berupa angka"),
});

const useUpdateDataBukuModal = (id: string) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue: setValueUpdateBook,
  } = useForm({
    resolver: yupResolver(updateBookSchema),
  });

  const updateBook = async (payload: IBook) => {
    const res = await bookServices.updateBook(id, payload);
    return res;
  };

  const {
    mutate: mutateUpdateBook,
    isPending: isPendingUpdateBook,
    isSuccess: isSuccessUpdateBook,
  } = useMutation({
    mutationFn: updateBook,
    onError: (error: ApiAxiosError) => {
      addToast({
        title: "Gagal Menghapus Data Buku",
        description:
          error?.response?.data?.errors ||
          error?.response?.data?.message ||
          "Terjadi kesalahan saat menghapus data buku. Silakan coba lagi.",
        color: "danger",
      });
    },
    onSuccess: () => {
      addToast({
        title: "Berhasil Menghapus Buku",
        description: "Data buku telah berhasil dihapus.",
        color: "success",
      });
      reset();
    },
  });

  const handleUpdateBook = (data: IBook) => {
    data.buku_paket = data.buku_paket === "true";
    data.isFeatured = data.isFeatured === "true";
    data.tahun_terbit = Number(data.tahun_terbit);
    data.stok = Number(data.stok);

    mutateUpdateBook(data);
  };

  return {
    control,
    errors,
    reset,
    setValueUpdateBook,
    handleSubmit,
    handleUpdateBook,
    isPendingUpdateBook,
    isSuccessUpdateBook,
  };
};

export default useUpdateDataBukuModal;
