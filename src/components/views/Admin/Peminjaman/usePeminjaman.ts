import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import bookServices from "@/services/book.service";
import borrowServices from "@/services/borrow.service";
import { IBorrowItem } from "@/types/Borrow";
import { SharedSelection } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

const usePeminjaman = () => {
  const [selectedId, setSelectedId] = useState<IBorrowItem | null>(null);
  const [filterBy, setFilterBy] = useState<string>("peminjam");
  const router = useRouter();
  const debounce = useDebounce();
  const currentSize = router.query.size;
  const currentPage = router.query.page;
  const currentJudul = router.query.judul;
  const currentKategori = router.query.kategori;

  const setUrl = () => {
    router.replace({
      query: {
        size: currentSize || LIMIT_DEFAULT,
        page: currentPage || PAGE_DEFAULT,
        // judul: filterBy === "judul" ? currentJudul || "" : "",
        // kategori: filterBy === "kategori" ? currentKategori || "" : "",
      },
    });
  };

  const getBorrows = async () => {
    const params = {
      page: currentPage,
      size: currentSize,
    };

    const { data } = await borrowServices.getBorrows(params);
    return data;
  };

  const searchBooks = async () => {
    const params = {
      page: currentPage,
      size: currentSize,
      judul: filterBy === "peminjam" ? currentJudul || undefined : undefined,
      kategori: filterBy === "buku" ? currentKategori || undefined : undefined,
    };

    const { data } = await bookServices.searchBooks(params);
    return data;
  };

  // Logika otomatis — jika ada query pencarian, pakai searchBooks
  const {
    data: dataBorrows,
    refetch: refetchBorrows,
    isLoading: isLoadingBorrows,
    isRefetching: isRefetchingBorrows,
  } = useQuery({
    queryKey: [
      "AdminPeminjaman",
      currentPage,
      currentSize,
      currentJudul,
      currentKategori,
      filterBy,
    ],
    queryFn: () => {
      const hasSearchParams = !!currentJudul || !!currentKategori;
      return hasSearchParams ? searchBooks() : getBorrows();
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
      const value = e.target.value;
      router.push({
        query: {
          ...router.query,
          judul: filterBy === "peminjam" ? value || undefined : undefined,
          kategori: filterBy === "buku" ? value || undefined : undefined,
          page: PAGE_DEFAULT,
        },
      });
    }, DELAY);
  };

  const handleClearSearch = () => {
    router.push({
      query: {
        ...router.query,
        [filterBy]: undefined,
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleFilterSearch = (keys: SharedSelection) => {
    const key = Array.from(keys)[0] as "peminjam" | "buku";

    setFilterBy(key);

    if (key === "peminjam") {
      router.push({
        query: {
          ...router.query,
          judul: key === "peminjam" ? undefined : undefined,
          kategori: undefined,
          page: PAGE_DEFAULT,
        },
      });
    } else {
      router.push({
        query: {
          ...router.query,
          judul: undefined,
          kategori: key === "buku" ? undefined : undefined,
          page: PAGE_DEFAULT,
        },
      });
    }
  };

  return {
    currentJudul,
    currentKategori,
    currentPage,
    currentSize,
    dataBorrows,
    filterBy,
    setFilterBy,
    handleFilterSearch,
    handleChangePage,
    handleChangeSize,
    handleClearSearch,
    handleSearch,
    isLoadingBorrows,
    isRefetchingBorrows,
    refetchBorrows,
    setUrl,
    selectedId,
    setSelectedId,
  };
};

export default usePeminjaman;
