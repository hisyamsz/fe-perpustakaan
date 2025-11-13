import {
  Button,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { FC, Key, ReactNode, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";

interface DataTableProps {
  buttonTopContentLabel?: string;
  columns: { name: string; uid: string; sortable?: boolean }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderCell: (item: Record<string, any>, columnKey: Key) => ReactNode;

  searchFields?: string[];
  searchPlaceholder?: string;
  rowsPerPage?: number;
  onPressButtonTopContent?: () => void;
  disabledSearch?: boolean;
}

const DataTable: FC<DataTableProps> = ({
  buttonTopContentLabel,
  columns,
  data,
  renderCell,
  searchFields = ["judul"],
  searchPlaceholder = "Cari data...",
  rowsPerPage = 5,
  onPressButtonTopContent,
  disabledSearch = false,
}) => {
  const [filterValue, setFilterValue] = useState("");
  const [sortColumn, setSortColumn] = useState<string | undefined>(undefined);
  const [sortDirection, setSortDirection] = useState<
    "ascending" | "descending"
  >("ascending");
  const [page, setPage] = useState(1);

  const filteredData = useMemo(() => {
    if (!filterValue) return data;
    const lowerFilter = filterValue.toLowerCase();
    return data.filter((item) =>
      searchFields.some((field) =>
        String(item[field]).toLowerCase().includes(lowerFilter),
      ),
    );
  }, [filterValue, data, searchFields]);

  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;
    return [...filteredData].sort((a, b) => {
      const first = a[sortColumn];
      const second = b[sortColumn];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDirection === "descending" ? -cmp : cmp;
    });
  }, [filteredData, sortColumn, sortDirection]);

  // 📄 Pagination
  const pages = Math.ceil(sortedData.length / rowsPerPage);
  const pagedData = sortedData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  const onSearchChange = (value?: string) => {
    setFilterValue(value || "");
    setPage(1);
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col-reverse justify-between gap-y-4 lg:flex-row lg:items-center">
        {!disabledSearch && (
          <Input
            isClearable
            className="w-full lg:max-w-sm"
            placeholder={searchPlaceholder}
            startContent={<CiSearch />}
            value={filterValue}
            onValueChange={onSearchChange}
            onClear={() => onSearchChange("")}
          />
        )}
        {buttonTopContentLabel && (
          <Button
            variant="solid"
            color="primary"
            onPress={onPressButtonTopContent}
          >
            {buttonTopContentLabel}
          </Button>
        )}
      </div>
    );
  }, [
    filterValue,
    searchPlaceholder,
    buttonTopContentLabel,
    onPressButtonTopContent,
    disabledSearch,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <>
        {pages > 1 && (
          <div className="mt-4 flex justify-center">
            <Pagination
              isCompact
              showControls
              color="primary"
              page={page}
              total={pages}
              onChange={setPage}
            />
          </div>
        )}
      </>
    );
  }, [page, pages]);

  return (
    <Table
      aria-label="Reusable Data Table"
      topContent={topContent}
      topContentPlacement="outside"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      sortDescriptor={
        sortColumn
          ? { column: sortColumn, direction: sortDirection }
          : undefined
      }
      onSortChange={(descriptor) => {
        setSortColumn(descriptor.column as string);
        setSortDirection(descriptor.direction as "ascending" | "descending");
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            allowsSorting={column.sortable}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody emptyContent={"Tidak ada data ditemukan"} items={pagedData}>
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
