import { LIMIT_LISTS } from "@/constants/list.constants";
import { cn } from "@/utils/cn";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Select,
  SelectItem,
  SharedSelection,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { useRouter } from "next/router";
import { ChangeEvent, FC, Key, ReactNode, useMemo } from "react";
import { CiSearch } from "react-icons/ci";
import { LuTextSearch } from "react-icons/lu";
import { TbRefresh } from "react-icons/tb";

interface DataTableProps {
  buttonTopContentLabel?: string;
  columns: Record<string, unknown>[];
  currentLimit?: string;
  currentPage?: number;
  data: Record<string, unknown>[];
  emptyContent: string;
  filterBy?: string;
  setFilterBy?: (key: string) => void;
  filterOptions?: { key: string; label: string }[];
  handleChangeLimit?: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleChangePage?: (page: number) => void;
  handleClearSearch?: () => void;
  handleSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
  onClickButtonTopContent?: () => void;
  renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
  refreshButton?: boolean;
  refreshClassName?: string;
  onRefreshButton?: () => void;
  showLimit?: boolean;
  showSearch?: boolean;
  totalPages: number;
  onSelectionChange?: (keys: SharedSelection) => void;
}

const DataTable: FC<DataTableProps> = ({
  buttonTopContentLabel,
  columns,
  currentLimit,
  currentPage,
  data,
  emptyContent,
  filterBy,
  filterOptions,
  handleChangeLimit,
  handleChangePage,
  handleClearSearch,
  handleSearch,
  isLoading,
  onClickButtonTopContent,
  renderCell,
  refreshButton = false,
  refreshClassName,
  onRefreshButton,
  showLimit = false,
  showSearch = false,
  totalPages,
  onSelectionChange,
}) => {
  const { query } = useRouter();

  const TopContent = useMemo(() => {
    return (
      <div className="mb-2 flex flex-col-reverse justify-between gap-y-4 lg:flex-row lg:items-center">
        {showSearch && (
          <div className="flex gap-4">
            <Input
              isClearable
              variant="flat"
              placeholder={`Cari berdasarkan ${filterBy}..`}
              startContent={<CiSearch />}
              defaultValue={query?.[`${filterBy}`] as string}
              onClear={handleClearSearch}
              onChange={handleSearch}
              className="w-full"
            />
            <Dropdown>
              <DropdownTrigger title="Filter">
                <Button color="primary" variant="bordered" isIconOnly>
                  <LuTextSearch size={22} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Filter Search"
                selectedKeys={[`${filterBy}`]}
                selectionMode="single"
                variant="solid"
                color="primary"
                onSelectionChange={onSelectionChange}
              >
                {(filterOptions ?? []).map((opt) => (
                  <DropdownItem key={opt.key}>{opt.label}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        )}

        <div className="flex w-full items-center justify-end gap-2 lg:w-auto">
          {refreshButton && (
            <Button
              isIconOnly
              color="primary"
              variant="bordered"
              title="Refresh"
              className={refreshClassName}
              onPress={onRefreshButton}
            >
              <TbRefresh size={18} />
            </Button>
          )}

          {buttonTopContentLabel && (
            <Button
              className="bg-primary w-full text-white lg:w-auto"
              onPress={onClickButtonTopContent}
            >
              {buttonTopContentLabel}
            </Button>
          )}
        </div>
      </div>
    );
  }, [
    buttonTopContentLabel,
    handleSearch,
    handleClearSearch,
    onClickButtonTopContent,
    showSearch,
    filterBy,
    filterOptions,
    query,
    onSelectionChange,
    refreshButton,
    onRefreshButton,
    refreshClassName,
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
