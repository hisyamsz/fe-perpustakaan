import CardBook from "@/components/ui/CardBook";
import { IBook } from "@/types/Book";
import Link from "next/link";
import { FC } from "react";

interface HomeEventListProps {
  dataBooks: IBook[];
  isLoadingBooks: boolean;
  title: string;
  urlMore?: string;
}

const HomeEventList: FC<HomeEventListProps> = ({
  dataBooks,
  isLoadingBooks,
  title,
  urlMore = "books",
}) => {
  return (
    <section className="px-6 lg:px-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-primary text-2xl font-bold">{title}</h2>
        <Link
          href={urlMore}
          className="text-foreground-500 font-semibold hover:underline"
        >
          Lainnya
        </Link>
      </div>
      <div className="grid auto-cols-[20rem] grid-flow-col gap-6 overflow-x-auto pt-2 pb-6 lg:grid-cols-4 lg:py-1">
        {!isLoadingBooks
          ? dataBooks?.map((book) => (
              <CardBook
                key={`card-book-${book.id}`}
                book={book}
                className="first:ml-4 last:mr-4 lg:first:ml-1 lg:last:mr-1"
              />
            ))
          : Array.from({ length: 4 }).map((_, index) => (
              <CardBook
                key={`card-event-loading${index}`}
                className="first:ml-4 last:mr-4 lg:first:ml-1 lg:last:mr-1"
                isLoading={isLoadingBooks}
              />
            ))}
      </div>
    </section>
  );
};

export default HomeEventList;
