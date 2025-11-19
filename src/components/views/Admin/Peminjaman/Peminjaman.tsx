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
import PeminjamanRejectModal from "./PeminjamanRejectModal";

const Peminjaman: FC = () => {
  const { isReady, query, push } = useRouter();
  const {
    currentPage,
    currentSize,
    dataBorrows,
    filterBy,
    handleChangePage,
    handleChangeSize,
    handleClearSearch,
    handleFilterSearch,
    handleSearch,
    isLoadingBorrows,
    isRefetchingBorrows,
    refetchBorrows,
    selectedId,
    setSelectedId,
    setUrl,
  } = usePeminjaman();

  const disclosureValidateModal = useDisclosure();
  const disclosureReturnModal = useDisclosure();
  const disclosureRejectModal = useDisclosure();

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
          const status = borrow?.status?.toLowerCase();
          const canReject = status === "diproses";
          const detailLabel =
            status === "dikembalikan"
              ? "Detail Pengembalian"
              : !isValid
                ? "Konfirmasi"
                : "Pengembalian";

          const handleDetailAction = () => {
            console.log(borrow);
            setSelectedId(borrow);

            if (status === "dikembalikan") {
              push(`/admin/pengembalian/${borrow.id}`);
              return;
            }

            if (!isValid) {
              disclosureValidateModal.onOpen();
            } else {
              disclosureReturnModal.onOpen();
            }
          };

          return (
            <DropdownAction
              detailLabel={detailLabel}
              onPressButtonDetail={handleDetailAction}
              hideButtonDelete={!canReject}
              deleteLabel="Tolak"
              onPressButtonDelete={() => {
                setSelectedId(borrow);
                disclosureRejectModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [
      setSelectedId,
      disclosureValidateModal,
      disclosureReturnModal,
      disclosureRejectModal,
      push,
    ],
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
          onRefreshButton={refetchBorrows}
          onSelectionChange={handleFilterSearch}
          refreshButton
          refreshClassName="w-full"
          renderCell={renderCell}
          showLimit
          showSearch
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
      <PeminjamanRejectModal
        {...disclosureRejectModal}
        refetchBorrow={refetchBorrows}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </section>
  );
};

export default Peminjaman;
