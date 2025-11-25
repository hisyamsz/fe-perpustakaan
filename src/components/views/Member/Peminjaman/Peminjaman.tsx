import DataTable from "@/components/ui/DataTable";
import { Chip } from "@heroui/react";
import { useCallback, Key, ReactNode, useEffect, FC } from "react";
import { useRouter } from "next/router";
import { COLUMN_LIST_PEMINJAMAN } from "./Peminjaman.constants";
import usePeminjaman from "./usePeminjaman";
import { convertTime } from "@/utils/date";
import { IBorrowItem } from "@/types/Borrow";
import DropdownAction from "@/components/commons/DropdownAction";

const Peminjaman: FC = () => {
  const { isReady, query, push } = useRouter();
  const {
    currentPage,
    currentSize,
    dataBorrows,
    handleChangePage,
    handleChangeSize,
    isLoadingBorrows,
    isRefetchingBorrows,
    setUrl,
  } = usePeminjaman();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  const renderCell = useCallback(
    (borrow: IBorrowItem, columnKey: Key) => {
      const cellValue = borrow[columnKey as keyof typeof borrow];

      switch (columnKey) {
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
        case "aksi":
          const isReturned = borrow.status?.toLowerCase() === "dikembalikan";
          return (
            <DropdownAction
              detailLabel="Detail Pengembalian"
              disabledButtonDetail={!isReturned}
              hideButtonDelete
              onPressButtonDetail={() => {
                if (isReturned) {
                  push(`/member/pengembalian/${borrow.id}`);
                }
                return null;
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          columns={COLUMN_LIST_PEMINJAMAN}
          currentLimit={String(currentSize)}
          currentPage={Number(currentPage)}
          data={dataBorrows?.data || []}
          emptyContent="Data peminjam tidak ditemukan"
          handleChangeLimit={handleChangeSize}
          handleChangePage={handleChangePage}
          isLoading={isLoadingBorrows || isRefetchingBorrows}
          renderCell={renderCell}
          showLimit
          totalPages={dataBorrows?.paging?.totalPage || 1}
        />
      )}
    </section>
  );
};

export default Peminjaman;
