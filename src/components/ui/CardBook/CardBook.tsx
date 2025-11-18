import {
  CATEGORY_COLORS,
  CATEGORY_STYLES,
} from "@/components/views/Home/Home.constants";
import { IBook } from "@/types/Book";
import { cn } from "@/utils/cn";
import { Card, CardBody, CardFooter, Chip, Skeleton } from "@heroui/react";
import { useRouter } from "next/router";
import { FC, Fragment } from "react";
import { FaBookOpen } from "react-icons/fa";

interface CardBookProps {
  className?: string;
  book?: IBook;
  key?: string;
  isLoading?: boolean;
}

const CardBook: FC<CardBookProps> = ({ className, book, key, isLoading }) => {
  const router = useRouter();

  const category = book?.kategori?.toLowerCase() || "Unknown";
  const style = CATEGORY_STYLES[category] || {
    iconColor: "text-gray-400",
    coverBg: "bg-gray-100",
  };

  return (
    <Card
      key={key}
      className={cn(
        className,
        "shadow-card hover:shadow-soft cursor-pointer px-2 py-1 transition-all duration-300 hover:-translate-y-1",
      )}
      shadow="sm"
      isPressable
      onPress={() => router.push(`books/${book?.id || ""}`)}
    >
      {!isLoading ? (
        <Fragment>
          <CardBody className="flex flex-col">
            {/* Cover Book Icon */}
            <div
              className={cn(
                "mb-4 flex h-40 w-full items-center justify-center rounded-lg",
                style.coverBg,
              )}
            >
              <FaBookOpen className={cn("h-12 w-12", style.iconColor)} />
            </div>

            {/* Title & Author */}
            <h2 className="text-foreground line-clamp-2 text-lg font-bold">
              {book?.judul}
            </h2>
            <p className="text-foreground-500 line-clamp-1 capitalize">
              {book?.penulis}
            </p>
          </CardBody>

          <CardFooter className="text-foreground-400 flex w-full justify-between pt-0 text-sm">
            {/* category */}
            <Chip
              color={
                CATEGORY_COLORS[book?.kategori?.toLowerCase() || ""] ||
                "default"
              }
              className="capitalize"
            >
              {book?.kategori || "Unknown"}
            </Chip>

            {/* year */}
            <span>{book?.tahun_terbit || "-"}</span>
          </CardFooter>
        </Fragment>
      ) : (
        <Fragment>
          <CardBody>
            <Skeleton className="bg-default-300 mb-4 h-40 w-full rounded-lg" />
            <Skeleton className="bg-default-200 mb-2 h-3 w-3/5 rounded-lg" />
            <Skeleton className="bg-default-200 h-3 w-4/5 rounded-lg" />
          </CardBody>
          <CardFooter className="flex w-full justify-between pt-0">
            <Skeleton className="bg-default-200 h-3 w-20 rounded-lg" />
            <Skeleton className="bg-default-200 h-3 w-12 rounded-lg" />
          </CardFooter>
        </Fragment>
      )}
    </Card>
  );
};

export default CardBook;
