import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { FC, Key, ReactNode } from "react";

interface DataTableProps {
  columns: Record<string, unknown>[];
  data: Record<string, unknown>[];
  renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
}

const DataTable: FC<DataTableProps> = ({ columns, data, renderCell }) => {
  return (
    <Table aria-label="Data Table">
      <TableHeader columns={columns} aria-label="Data Table Header">
        {(column) => (
          <TableColumn
            key={column.uid as Key}
            aria-label={`Data ${column.name}`}
          >
            {column.name as string}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={data} aria-label="Data Table Body">
        {(item) => (
          <TableRow
            key={item.id as Key}
            aria-label={`Data Table Row ${item.id}`}
          >
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
