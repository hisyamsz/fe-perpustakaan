import { LIMIT_BOOK, PAGE_DEFAULT } from "@/constants/list.constants";
import bookServices from "@/services/book.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useHome = () => {
  const router = useRouter();

  const getBooksFeatured = async () => {
    const params = {
      size: LIMIT_BOOK,
      page: PAGE_DEFAULT,
      featured: "true",
    };

    const { data } = await bookServices.searchBooks(params);
    return data;
  };

  const { data: dataBooks, isLoading: isLoadingBooks } = useQuery({
    queryKey: ["BooksFeatured"],
    queryFn: getBooksFeatured,
    staleTime: 1000 * 60 * 3,
    gcTime: 1000 * 60 * 10,
  });

  const handleNavigate = (judul?: string) => {
    router.push({
      pathname: "/member/dataBuku",
      query: { judul: judul || "" },
    });
  };

  return {
    dataBooks,
    isLoadingBooks,
    handleNavigate,
  };
};

export default useHome;
