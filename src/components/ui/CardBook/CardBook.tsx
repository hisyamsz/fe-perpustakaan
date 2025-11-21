import {
  CATEGORY_COLORS,
  CATEGORY_STYLES,
} from "@/components/views/Home/Home.constants";
import { IBook } from "@/types/Book";
import { cn } from "@/utils/cn";
import {
  Card,
  CardBody,
  CardFooter,
  Chip,
  Skeleton,
  Button,
  Divider,
} from "@heroui/react";
import { FC, Fragment } from "react";
import { FaBookOpen } from "react-icons/fa";

interface CardBookProps {
  className?: string;
  book?: IBook;
  isLoading?: boolean;
  handleNavigate?: () => void;
}

const CardBook: FC<CardBookProps> = ({
  className,
  book,
  isLoading,
  handleNavigate,
}) => {
  const category = book?.kategori?.toLowerCase() || "unknown";
  const style = CATEGORY_STYLES[category] || {
    iconColor: "text-gray-400",
    coverBg: "bg-gray-100",
  };

  const isOutOfStock = ((book?.stok as number) ?? 0) <= 0;

  return (
    <Card
      key={`card-book-${book?.id || "unknown"}`}
      className={cn(className, "px-2 py-1 hover:shadow-lg")}
      shadow="sm"
    >
      {!isLoading ? (
        <Fragment>
          <CardBody className="flex flex-col">
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

          <CardFooter className="flex w-full flex-col gap-2 pt-0">
            {/* category + year */}
            <div className="flex w-full justify-between text-sm">
              <Chip
                color={
                  CATEGORY_COLORS[book?.kategori?.toLowerCase() || ""] ||
                  "default"
                }
                variant="solid"
                size="sm"
                className="capitalize"
              >
                {book?.kategori || "Unknown"}
              </Chip>

              <span className="text-foreground-400">
                {book?.tahun_terbit || "-"}
              </span>
            </div>

            <Divider className="my-2" />

            <Button
              size="sm"
              color={isOutOfStock ? "default" : "primary"}
              className="w-full"
              onPress={handleNavigate}
              isDisabled={isOutOfStock}
            >
              {isOutOfStock ? "Stok Habis" : "Pinjam"}
            </Button>
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
