import CardBook from "@/components/ui/CardBook";
import { IBook } from "@/types/Book";
import Link from "next/link";
import { FC, useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface HomeFeaturedProps {
  dataBooks: IBook[];
  isLoadingBooks: boolean;
  title: string;
  handleNavigate: (judul?: string) => void;
  urlMore?: string;
}

const HomeFeatured: FC<HomeFeaturedProps> = ({
  dataBooks,
  isLoadingBooks,
  title,
  handleNavigate,
  urlMore = "koleksi-buku",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const [constraints, setConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    if (!containerRef.current || !innerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const contentWidth = innerRef.current.scrollWidth;

    const maxDrag = contentWidth - containerWidth;

    setConstraints({
      left: -maxDrag,
      right: 0,
    });
  }, [dataBooks]);

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

      <div ref={containerRef} className="overflow-hidden py-2">
        <motion.div
          ref={innerRef}
          drag="x"
          dragConstraints={constraints}
          className="grid auto-cols-[20rem] grid-flow-col gap-6 select-none active:cursor-grabbing"
        >
          {!isLoadingBooks
            ? dataBooks?.map((book) => (
                <CardBook
                  key={`card-book-${book.id}`}
                  book={book}
                  className="first:ml-2 last:mr-2 lg:first:ml-1 lg:last:mr-1"
                  handleNavigate={() => {
                    handleNavigate(book.judul);
                  }}
                />
              ))
            : Array.from({ length: 4 }).map((_, index) => (
                <CardBook
                  key={`card-event-loading${index}`}
                  className="first:ml-2 last:mr-2 lg:first:ml-1 lg:last:mr-1"
                  isLoading={isLoadingBooks}
                />
              ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeFeatured;
