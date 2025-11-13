import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import bookServices from "@/services/book.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";

const useDataBuku = () => {
  const router = useRouter();
  const debounce = useDebounce();
  const currentSize = router.query.size;
  const currentPage = router.query.page;
  const currentJudul = router.query.judul;
  const currentKategori = router.query.kategori;

  // ✅ Fungsi untuk set URL default
  const setUrl = () => {
    router.replace({
      query: {
        size: currentSize || LIMIT_DEFAULT,
        page: currentPage || PAGE_DEFAULT,
        judul: currentJudul || "",
        kategori: currentKategori || "",
      },
    });
  };

  // ✅ Fungsi ambil semua buku (tanpa parameter)
  const getBooks = async () => {
    const { data } = await bookServices.getBooks();
    return data;
  };

  // ✅ Fungsi search buku (mengirim query ke backend)
  const searchBooks = async () => {
    const params = {
      page: currentPage,
      size: currentSize,
      judul: currentJudul || undefined,
      kategori: currentKategori || undefined,
    };

    const { data } = await bookServices.searchBooks(params);
    return data;
  };

  // ✅ Logika otomatis — jika ada query pencarian, pakai searchBooks
  const {
    data: dataBooks,
    refetch: refetchBook,
    isLoading: isLoadingBook,
    isRefetching: isRefetchingBook,
  } = useQuery({
    queryKey: [
      "Books",
      currentPage,
      currentSize,
      currentJudul,
      currentKategori,
    ],
    queryFn: () => {
      const hasSearchParams = !!currentJudul || !!currentKategori;
      return hasSearchParams ? searchBooks() : getBooks();
    },
    enabled: router.isReady && !!router.query,
  });

  const handleChangePage = (page: number) => {
    router.push({
      query: {
        ...router.query,
        page,
      },
    });
  };

  const handleChangeSize = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedSize = e.target.value;
    router.push({
      query: {
        ...router.query,
        size: selectedSize,
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      const searchJudul = e.target.value;
      console.log(searchJudul);
      router.push({
        query: {
          ...router.query,
          judul: searchJudul,
          page: PAGE_DEFAULT,
        },
      });
    }, DELAY);
  };

  const handleClearSearch = () => {
    router.push({
      query: {
        ...router.query,
        judul: "",
        page: PAGE_DEFAULT,
      },
    });
  };

  return {
    currentJudul,
    currentKategori,
    currentPage,
    currentSize,
    dataBooks,
    handleChangePage,
    handleChangeSize,
    handleClearSearch,
    handleSearch,
    isLoadingBook,
    isRefetchingBook,
    refetchBook,
    setUrl,
  };
};

export default useDataBuku;
