import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import bookServices from "@/services/book.service";
import { IBook } from "@/types/Book";
import { SharedSelection } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

const useDataBuku = () => {
  const [selectedId, setSelectedId] = useState<IBook | null>(null);
  const [filterBy, setFilterBy] = useState<string>("judul");
  const [filter, setFilter] = useState<string | string[]>("");
  const router = useRouter();
  const debounce = useDebounce();
  const currentSize = router.query.size;
  const currentPage = router.query.page;
  const currentJudul = router.query.judul;
  const currentKategori = router.query.kategori;
  const currentFeatured = router.query.featured;
  const currentPaket = router.query.paket;

  const setUrl = () => {
    router.replace({
      query: {
        size: currentSize || LIMIT_DEFAULT,
        page: currentPage || PAGE_DEFAULT,
        judul: filterBy === "judul" ? currentJudul || "" : "",
        kategori: filterBy === "kategori" ? currentKategori || "" : "",
        featured: currentFeatured || undefined,
        paket: currentPaket || undefined,
      },
    });
  };

  const getBooks = async () => {
    const params = {
      page: currentPage,
      size: currentSize,
    };

    const { data } = await bookServices.getBooks(params);
    return data;
  };

  const searchBooks = async () => {
    const params = {
      page: currentPage,
      size: currentSize,
      judul: filterBy === "judul" ? currentJudul || undefined : undefined,
      kategori:
        filterBy === "kategori" ? currentKategori || undefined : undefined,
      featured: currentFeatured === "true" ? "true" : undefined,
      paket: currentPaket === "true" ? "true" : undefined,
    };

    const { data } = await bookServices.searchBooks(params);
    return data;
  };

  // Logika otomatis — jika ada query pencarian, pakai searchBooks
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
      currentFeatured,
      currentPaket,
      filter,
      filterBy,
    ],
    queryFn: () => {
      const hasSearchParams =
        !!currentJudul ||
        !!currentKategori ||
        !!currentFeatured ||
        !!currentPaket;
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
      const value = e.target.value;
      router.push({
        query: {
          ...router.query,
          judul: filterBy === "judul" ? value || undefined : undefined,
          kategori: filterBy === "kategori" ? value || undefined : undefined,
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
    const key = Array.from(keys)[0] as string;

    setFilterBy(key);

    router.push({
      query: {
        ...router.query,
        user: key === "judul" ? "" : undefined,
        buku: key === "kategori" ? "" : undefined,
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleFilter = (keys: SharedSelection) => {
    const selected = Array.from(keys) as string[];

    setFilter(selected);

    router.push({
      query: {
        ...router.query,
        featured: selected.includes("featured") ? "true" : undefined,
        paket: selected.includes("paket") ? "true" : undefined,
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
    filter,
    filterBy,
    handleChangePage,
    handleChangeSize,
    handleClearSearch,
    handleFilter,
    handleFilterSearch,
    handleSearch,
    isLoadingBook,
    isRefetchingBook,
    refetchBook,
    selectedId,
    setFilter,
    setFilterBy,
    setSelectedId,
    setUrl,
  };
};

export default useDataBuku;
