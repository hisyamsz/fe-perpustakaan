import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@heroui/react";
import { useCallback, Key, ReactNode, useEffect, FC } from "react";
import { useRouter } from "next/router";
import DropdownAction from "@/components/commons/DropdownAction";
import { COLUMN_LIST_PEMINJAMAN } from "./Peminjaman.constants";
import usePeminjaman from "./usePeminjaman";
import { convertTime } from "@/utils/date";
import { IBorrowItem } from "@/types/Borrow";
import PeminjamanValidateModal from "./PeminjamanValidateModal";
import PeminjamanReturnModal from "./PeminjamanReturnModal";

const Peminjaman: FC = () => {
  const { isReady, query } = useRouter();
  const {
    currentPage,
    currentSize,
    dataBorrows,
    filterBy,
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

  const disclosureValidateModal = useDisclosure();
  const disclosureReturnModal = useDisclosure();

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
          const isValid = Boolean(borrow.valid);
          return (
            <DropdownAction
              hideButtonDelete
              detailLabel={!isValid ? "Konfirmasi" : "Pengembalian"}
              onPressButtonDetail={() => {
                setSelectedId(borrow);

                if (!isValid) {
                  disclosureValidateModal.onOpen();
                } else {
                  disclosureReturnModal.onOpen();
                }
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [setSelectedId, disclosureValidateModal, disclosureReturnModal],
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
          filterBy={filterBy}
          filterOptions={[
            { key: "user", label: "Peminjam" },
            { key: "buku", label: "Judul Buku" },
          ]}
          handleChangeLimit={handleChangeSize}
          handleChangePage={handleChangePage}
          handleClearSearch={handleClearSearch}
          handleSearch={handleSearch}
          isLoading={isLoadingBorrows || isRefetchingBorrows}
          renderCell={renderCell}
          refreshButton
          onRefreshButton={refetchBorrows}
          refreshClassName="w-full"
          showLimit
          showSearch
          onSelectionChange={handleFilterSearch}
          totalPages={dataBorrows?.paging?.totalPage || 1}
        />
      )}

      <PeminjamanValidateModal
        {...disclosureValidateModal}
        refetchBorrow={refetchBorrows}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
      <PeminjamanReturnModal
        {...disclosureReturnModal}
        refetchBorrow={refetchBorrows}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </section>
  );
};

export default Peminjaman;
