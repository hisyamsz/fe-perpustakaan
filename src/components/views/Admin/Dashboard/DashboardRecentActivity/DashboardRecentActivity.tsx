import { FC, Key, ReactNode, useCallback } from "react";
import { Chip } from "@heroui/react";
import DataTable from "@/components/ui/DataTable";
import useDashboardRecentActivity from "./useDashboardRecentActivity";
import { convertTime } from "@/utils/date";
import { IBorrowItem } from "@/types/Borrow";
import { COLUMN_LIST_RECENT_ACTIVITY } from "../Dashboard.constants";

const DashboardRecentActivity: FC = () => {
  const { dataBorrows, isLoadingBorrows } = useDashboardRecentActivity();

  const renderCell = useCallback((borrow: IBorrowItem, columnKey: Key) => {
    const cellValue = borrow[columnKey as keyof IBorrowItem];

    switch (columnKey) {
      case "peminjam":
        return <p>{borrow.user?.nama}</p>;
      case "buku":
        return <p>{borrow.buku?.judul}</p>;
      case "tanggal_pinjam":
        return <p>{convertTime(cellValue as string)}</p>;
      case "tenggat_kembali":
        return <p>{convertTime(cellValue as string)}</p>;
      case "status":
        return (
          <Chip
            color={
              cellValue === "Diproses"
                ? "warning"
                : cellValue === "Dipinjam"
                  ? "secondary"
                  : cellValue === "Dikembalikan"
                    ? "success"
                    : "danger"
            }
            size="sm"
            variant="flat"
          >
            {cellValue as string}
          </Chip>
        );
      default:
        return cellValue as ReactNode;
    }
  }, []);

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold">Aktivitas Terbaru</h2>

      <DataTable
        columns={COLUMN_LIST_RECENT_ACTIVITY}
        data={dataBorrows?.data || []}
        emptyContent="Data terbaru tidak ditemukan"
        isLoading={isLoadingBorrows}
        renderCell={renderCell}
        totalPages={1}
      />
    </div>
  );
};

export default DashboardRecentActivity;
