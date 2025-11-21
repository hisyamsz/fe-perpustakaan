import bookServices from "@/services/book.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useKoleksiBuku = () => {
  const [search, setSearch] = useState<string | undefined>("");
  const [featured, setFeatured] = useState<string | undefined>(undefined);
  const router = useRouter();

  const params = {
    size: 20,
    page: 1,
    judul: search || undefined,
    featured: featured || undefined,
  };

  const getAllBooks = async () => {
    const { data } = await bookServices.getBooks({
      size: params.size,
      page: params.page,
    });
    return data;
  };

  const searchDataBooks = async () => {
    const { data } = await bookServices.searchBooks(params);
    return data;
  };

  const {
    data: dataBooks,
    isPending: isPendingBooks,
    refetch,
  } = useQuery({
    queryKey: ["books", params.judul, params.featured],
    queryFn: () => {
      const isSearch = params.judul || params.featured;
      return isSearch ? searchDataBooks() : getAllBooks();
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  const handleSearch = () => {
    refetch();
  };

  const handleNavigate = () => {
    router.push({
      pathname: "/member/dataBuku",
      query: { judul: dataBooks?.data?.judul || "" },
    });
    setSearch("");
  };

  return {
    dataBooks,
    handleNavigate,
    handleSearch,
    isPendingBooks,
    search,
    setSearch,
    featured,
    setFeatured,
  };
};

export default useKoleksiBuku;
