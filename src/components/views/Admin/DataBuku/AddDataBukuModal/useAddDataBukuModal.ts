import bookServices from "@/services/book.service";
import { ApiAxiosError } from "@/types/Axios";
import { IBook } from "@/types/Book";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const currentYear = new Date().getFullYear();

const addBookSchema = yup.object().shape({
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
  isFeatured: yup.string().required("Status unggulan wajib diisi (Ya/Tidak)"),
  stok: yup
    .string()
    .required("Jumlah stok wajib diisi")
    .matches(/^[0-9]+$/, "Stok harus berupa angka"),
});

const useAddDataBukuModal = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(addBookSchema),
  });

  const addBook = async (payload: IBook) => {
    const res = await bookServices.addBook(payload);
    return res;
  };

  const {
    mutate: mutateAddBook,
    isPending: isPendingAddBook,
    isSuccess: isSuccessAddBook,
  } = useMutation({
    mutationFn: addBook,
    onError: (error: ApiAxiosError) => {
      addToast({
        title: "Gagal menambahkan buku",
        description:
          error?.response?.data?.errors ||
          error?.response?.data?.message ||
          "Terjadi kesalahan saat menyimpan data",
        color: "danger",
      });
    },
    onSuccess: () => {
      addToast({
        title: "Berhasil",
        description: "Buku berhasil ditambahkan",
        color: "success",
      });
      reset();
    },
  });

  const handleAddBook = (data: IBook) => {
    const payload = {
      ...data,
      tahun_terbit: Number(data.tahun_terbit),
      isFeatured: data.isFeatured === "true",
      stok: Number(data.stok),
    };

    mutateAddBook(payload);
  };

  return {
    control,
    errors,
    reset,
    handleAddBook,
    handleSubmit,
    isPendingAddBook,
    isSuccessAddBook,
  };
};

export default useAddDataBukuModal;
