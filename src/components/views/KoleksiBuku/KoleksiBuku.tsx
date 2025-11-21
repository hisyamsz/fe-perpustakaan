import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@heroui/react";
import { FC, useEffect } from "react";
import { CiFilter, CiSearch } from "react-icons/ci";
import useKoleksiBuku from "./useKoleksiBuku";
import CardBook from "@/components/ui/CardBook";
import { IBook } from "@/types/Book";
import { data } from "framer-motion/m";

const KoleksiBuku: FC = () => {
  const {
    dataBooks,
    handleNavigate,
    handleSearch,
    isPendingBooks,
    search,
    setSearch,
    featured,
    setFeatured,
  } = useKoleksiBuku();

  useEffect(() => {
    setSearch("");
    setFeatured(undefined);
  }, []);

  return (
    <section
      className="min-h-screen pt-12 pb-18"
      aria-labelledby="koleksi-heading"
    >
      <div className="container mx-auto px-4 md:px-0">
        <div className="mx-auto max-w-4xl">
          <header className="text-center">
            <h1
              id="koleksi-heading-title"
              className="mb-4 text-4xl font-bold drop-shadow-md md:text-5xl"
            >
              Koleksi Buku
            </h1>

            <p className="text-foreground-600 mx-auto mb-12 max-w-3xl text-lg">
              Temukan berbagai koleksi buku yang tersedia di Perpustakaan SMKN 6
              Kota Tangerang Selatan. Jelajahi buku berdasarkan judul dan mulai
              perjalanan membaca yang baru.
            </p>
          </header>

          <div className="flex w-full items-center justify-center gap-2">
            <Input
              type="text"
              placeholder="Cari buku berdasakan judul.."
              startContent={<CiSearch />}
              variant="bordered"
              color="primary"
              isClearable
              className="w-full lg:w-xl"
              value={search}
              onValueChange={setSearch}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button
              isIconOnly
              variant="solid"
              color="primary"
              className="shadow-md"
              onPress={handleSearch}
            >
              <CiSearch size={24} />
            </Button>
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly variant="bordered" color="primary">
                  <CiFilter size={24} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Filter buku"
                variant="solid"
                selectionMode="multiple"
                selectedKeys={featured ? ["featured"] : undefined}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys).includes("featured");
                  setFeatured(selected ? "true" : undefined);
                }}
              >
                <DropdownItem key="featured">Unggulan</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="mt-14 w-full space-y-4 lg:px-14">
          <div className="text-foreground-500 text-sm">
            Menampilkan{" "}
            {!isPendingBooks ? (
              <span>{dataBooks?.paging?.totalItems || 0}</span>
            ) : (
              <span>0</span>
            )}{" "}
            buku
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {!isPendingBooks
              ? dataBooks?.data?.map((book: IBook) => (
                  <CardBook
                    key={`card-book-collection-${book.id}`}
                    book={book}
                    handleNavigate={handleNavigate}
                    className=""
                  />
                ))
              : Array.from({ length: 4 }).map((_, index) => (
                  <CardBook
                    key={`card-event-loading${index}`}
                    className=""
                    isLoading={isPendingBooks}
                  />
                ))}

            {!dataBooks && !isPendingBooks && (
              <div className="flex flex-col items-center justify-center">
                <p className="text-foreground-500 text-sm">
                  Tidak ada buku yang ditemukan
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KoleksiBuku;
