import bookServices from "@/services/book.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useKoleksiBuku = () => {
  const [searchInput, setSearchInput] = useState(""); // user mengetik
  const [searchQuery, setSearchQuery] = useState(""); // dipakai fetch

  const [featured, setFeatured] = useState<string | undefined>(undefined);
  const [paket, setPaket] = useState<string | undefined>(undefined);

  const router = useRouter();

  const params = {
    size: 20,
    page: 1,
    judul: searchQuery || undefined,
    featured: featured || undefined,
    paket: paket || undefined,
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
    queryKey: ["Books", params.judul, params.featured, params.paket],
    queryFn: () => {
      const isSearch = params.judul || params.featured || params.paket;
      return isSearch ? searchDataBooks() : getAllBooks();
    },
    enabled: router.isReady,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  const handleSearch = () => {
    setSearchQuery(searchInput);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearchQuery("");
  };

  const handleNavigate = (judul?: string) => {
    router.push({
      pathname: "/member/dataBuku",
      query: { judul },
    });
    setSearchInput("");
    setSearchQuery("");
  };

  return {
    dataBooks,
    searchInput,
    setSearchInput,
    featured,
    paket,
    handleSearch,
    handleClearSearch,
    handleNavigate,
    refetch,
    setFeatured,
    setPaket,
    isPendingBooks,
  };
};

export default useKoleksiBuku;
