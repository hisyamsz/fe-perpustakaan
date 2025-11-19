import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";
import borrowServices from "@/services/borrow.service";
import { IBorrowItem } from "@/types/Borrow";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

const usePeminjaman = () => {
  const [selectedId, setSelectedId] = useState<IBorrowItem | null>(null);
  const router = useRouter();
  const currentSize = router.query.size;
  const currentPage = router.query.page;

  const setUrl = () => {
    router.replace({
      query: {
        size: currentSize || LIMIT_DEFAULT,
        page: currentPage || PAGE_DEFAULT,
      },
    });
  };

  const getBorrowUser = async () => {
    const params = {
      page: currentPage,
      size: currentSize,
    };

    const { data } = await borrowServices.getBorrowUser(params);
    return data;
  };

  const {
    data: dataBorrows,
    refetch: refetchBorrows,
    isLoading: isLoadingBorrows,
    isRefetching: isRefetchingBorrows,
  } = useQuery({
    queryKey: ["MemberPeminjaman", currentPage, currentSize],
    queryFn: getBorrowUser,
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

  return {
    currentPage,
    currentSize,
    dataBorrows,
    handleChangePage,
    handleChangeSize,
    isLoadingBorrows,
    isRefetchingBorrows,
    refetchBorrows,
    setUrl,
    selectedId,
    setSelectedId,
  };
};

export default usePeminjaman;
