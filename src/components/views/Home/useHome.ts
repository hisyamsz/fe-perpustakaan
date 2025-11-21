import { LIMIT_BOOK, PAGE_DEFAULT } from "@/constants/list.constants";
import bookServices from "@/services/book.service";
import { useQuery } from "@tanstack/react-query";

const useHome = () => {
  const getBooksFeatured = async () => {
    const params = {
      size: LIMIT_BOOK,
      page: PAGE_DEFAULT,
      featured: "true",
    };

    const { data } = await bookServices.searchBooks(params);
    return data.data;
  };

  const { data: dataBooks, isLoading: isLoadingBooks } = useQuery({
    queryKey: ["BooksFeatured"],
    queryFn: getBooksFeatured,
  });

  return {
    dataBooks,
    isLoadingBooks,
  };
};

export default useHome;
