import { LIMIT_LISTS } from "@/constants/list.constants";
import { cn } from "@/utils/cn";
import {
  Button,
  Input,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { ChangeEvent, FC, Key, ReactNode, useMemo } from "react";
import { CiSearch } from "react-icons/ci";

interface DataTableProps {
  buttonTopContentLabel?: string;
  columns: Record<string, unknown>[];
  currentLimit?: string;
  currentPage?: number;
  data: Record<string, unknown>[];
  emptyContent: string;
  handleChangeLimit?: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleChangePage?: (page: number) => void;
  handleClearSearch?: () => void;
  handleSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
  onClickButtonTopContent?: () => void;
  renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
  showLimit?: boolean;
  showSearch?: boolean;
  totalPages: number;
}

const DataTable: FC<DataTableProps> = ({
  buttonTopContentLabel,
  columns,
  currentLimit,
  currentPage,
  data,
  emptyContent,
  handleChangeLimit,
  handleChangePage,
  handleClearSearch,
  handleSearch,
  isLoading,
  onClickButtonTopContent,
  renderCell,
  showLimit = false,
  showSearch = false,
  totalPages,
}) => {
  const TopContent = useMemo(() => {
    return (
      <div className="mb-2 flex flex-col-reverse justify-between gap-y-4 lg:flex-row lg:items-center">
        {showSearch && (
          <Input
            isClearable
            variant="flat"
            placeholder="Cari berdasarkan judul.."
            startContent={<CiSearch />}
            onClear={handleClearSearch}
            onChange={handleSearch}
            className="w-full lg:max-w-72"
          />
        )}
        {buttonTopContentLabel && (
          <Button
            className="bg-primary text-white"
            onPress={onClickButtonTopContent}
          >
            {buttonTopContentLabel}
          </Button>
        )}
      </div>
    );
  }, [
    buttonTopContentLabel,
    handleSearch,
    handleClearSearch,
    onClickButtonTopContent,
    showSearch,
  ]);

  const BottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-center p-2 lg:justify-between">
        {showLimit && (
          <Select
            aria-label="Select Limit"
            className="hidden max-w-32 lg:block"
            size="md"
            selectedKeys={[`${currentLimit}`]}
            selectionMode="single"
            onChange={handleChangeLimit}
            startContent={<p className="text-sm">Show:</p>}
            disallowEmptySelection
          >
            {LIMIT_LISTS.map(({ value, label }) => (
              <SelectItem key={value}>{label}</SelectItem>
            ))}
          </Select>
        )}
        {totalPages > 1 && (
          <Pagination
            loop
            isCompact
            showControls
            aria-label="Pagination"
            color="primary"
            total={totalPages}
            page={Number(currentPage)}
            onChange={handleChangePage}
          />
        )}
      </div>
    );
  }, [
    currentLimit,
    currentPage,
    totalPages,
    handleChangeLimit,
    handleChangePage,
    showLimit,
  ]);

  return (
    <Table
      topContent={TopContent}
      topContentPlacement="outside"
      bottomContent={BottomContent}
      bottomContentPlacement="outside"
      aria-label="Data Table"
      classNames={{
        base: "max-w-full",
        wrapper: cn({ "overflow-x-hidden": isLoading }),
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid as Key}>
            {column.name as string}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={emptyContent}
        isLoading={isLoading}
        items={data}
        loadingContent={
          <div className="bg-foreground-400/30 z-50 flex h-full w-full items-center justify-center backdrop-blur-sm">
            <Spinner className="text-primary" />
          </div>
        }
      >
        {(item) => (
          <TableRow key={item.id as Key}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
