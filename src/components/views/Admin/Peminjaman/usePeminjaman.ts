import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import borrowServices from "@/services/borrow.service";
import { IBorrowItem } from "@/types/Borrow";
import { SharedSelection } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

const usePeminjaman = () => {
  const [selectedId, setSelectedId] = useState<IBorrowItem | null>(null);
  const [filterBy, setFilterBy] = useState<string>("user");
  const router = useRouter();
  const debounce = useDebounce();
  const currentSize = router.query.size;
  const currentPage = router.query.page;
  const currentPeminjam = router.query.user;
  const currentJudul = router.query.buku;

  const setUrl = () => {
    router.replace({
      query: {
        size: currentSize || LIMIT_DEFAULT,
        page: currentPage || PAGE_DEFAULT,
        user: filterBy === "user" ? currentPeminjam || "" : "",
        buku: filterBy === "buku" ? currentJudul || "" : "",
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

  const searchBorrow = async () => {
    const params = {
      page: currentPage,
      size: currentSize,
      user: filterBy === "user" ? currentPeminjam || undefined : undefined,
      buku: filterBy === "buku" ? currentJudul || undefined : undefined,
    };

    const { data } = await borrowServices.searchBorrow(params);
    return data;
  };

  // Logika otomatis — jika ada query pencarian, pakai searchBorrow
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
      currentPeminjam,
      filterBy,
    ],
    queryFn: () => {
      const hasSearchParams = !!currentJudul || !!currentPeminjam;
      return hasSearchParams ? searchBorrow() : getBorrows();
    },
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
          user: filterBy === "user" ? value || undefined : undefined,
          buku: filterBy === "buku" ? value || undefined : undefined,
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
        user: key === "user" ? "" : undefined,
        buku: key === "buku" ? "" : undefined,
        page: PAGE_DEFAULT,
      },
    });
  };

  return {
    currentJudul,
    currentPage,
    currentPeminjam,
    currentSize,
    dataBorrows,
    filterBy,
    handleChangePage,
    handleChangeSize,
    handleClearSearch,
    handleFilterSearch,
    handleSearch,
    isLoadingBorrows,
    isRefetchingBorrows,
    refetchBorrows,
    selectedId,
    setFilterBy,
    setSelectedId,
    setUrl,
  };
};

export default usePeminjaman;
