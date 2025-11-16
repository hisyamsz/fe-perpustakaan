import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@heroui/react";
import { useCallback, Key, ReactNode, useEffect, FC } from "react";
import { useRouter } from "next/router";
import DropdownAction from "@/components/commons/DropdownAction";
import { COLUMN_LIST_PEMINJAMAN } from "./Peminjaman.constants";
import usePeminjaman from "./usePeminjaman";
import { convertTime } from "@/utils/date";
import { IBorrowItem } from "@/types/Borrow";

const Peminjaman: FC = () => {
  const { isReady, query } = useRouter();
  const {
    currentJudul,
    currentKategori,
    currentPage,
    currentSize,
    dataBorrows,
    filterBy,
    setFilterBy,
    handleFilterSearch,
    handleChangePage,
    handleChangeSize,
    handleClearSearch,
    handleSearch,
    isLoadingBorrows,
    isRefetchingBorrows,
    refetchBorrows,
    setUrl,
    selectedId,
    setSelectedId,
  } = usePeminjaman();

  const disclosureBorrowModal = useDisclosure();

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
        case "peminjam":
          return <p>{borrow.user?.nama}</p>;
        case "buku":
          return <p>{borrow.buku?.judul}</p>;
        case "tanggal_pinjam":
          return <p>{convertTime(cellValue as string)}</p>;
        case "tenggat_kembali":
          return <p>{convertTime(cellValue as string)}</p>;
        case "valid":
          return (
            <Chip
              color={borrow.valid ? "success" : "danger"}
              size="sm"
              variant="flat"
            >
              {borrow.valid ? "Valid" : "Tidak Valid"}
            </Chip>
          );
        case "status":
          return (
            <Chip
              color={cellValue === "Dipinjam" ? "warning" : "success"}
              size="sm"
              variant="flat"
            >
              {cellValue as string}
            </Chip>
          );
        case "aksi":
          return (
            <DropdownAction
              hideButtonDelete
              detailLabel="Konfirmasi"
              onPressButtonDetail={() => {
                setSelectedId(borrow);
                disclosureBorrowModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [setSelectedId, disclosureBorrowModal],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          columns={COLUMN_LIST_PEMINJAMAN}
          currentLimit={String(currentSize)}
          currentPage={Number(currentPage)}
          data={dataBorrows?.data || []}
          emptyContent="Data buku tidak ditemukan"
          filterBy={filterBy}
          handleChangeLimit={handleChangeSize}
          handleChangePage={handleChangePage}
          handleClearSearch={handleClearSearch}
          handleSearch={handleSearch}
          isLoading={isLoadingBorrows || isRefetchingBorrows}
          renderCell={renderCell}
          showLimit
          showSearch
          onSelectionChange={handleFilterSearch}
          totalPages={dataBorrows?.paging?.totalPage || 1}
        />
      )}

      {/*<BorrowBookModal
        {...disclosureBorrowModal}
        refetchBook={refetchBorrows}
        selectedBook={selectedId}
        setSelectedBook={setSelectedId}
      />*/}
    </section>
  );
};

export default Peminjaman;
