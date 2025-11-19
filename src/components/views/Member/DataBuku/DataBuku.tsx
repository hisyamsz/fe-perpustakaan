import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@heroui/react";
import { useCallback, Key, ReactNode, useEffect, FC } from "react";
import { COLUMN_LIST_DATABUKU } from "./DataBuku.constants";
import useDataBuku from "./useDataBuku";
import { useRouter } from "next/router";
import BorrowBookModal from "./BorrowBookModal";
import DropdownAction from "@/components/commons/DropdownAction";

const DataBuku: FC = () => {
  const { isReady, query } = useRouter();
  const {
    currentPage,
    currentSize,
    dataBooks,
    filterBy,
    handleChangePage,
    handleChangeSize,
    handleClearSearch,
    handleFilterSearch,
    handleSearch,
    isLoadingBook,
    isRefetchingBook,
    refetchBook,
    selectedId,
    setSelectedId,
    setUrl,
  } = useDataBuku();

  const disclosureBorrowModal = useDisclosure();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  const renderCell = useCallback(
    (buku: Record<string, unknown>, columnKey: Key) => {
      const cellValue = buku[columnKey as keyof typeof buku];

      switch (columnKey) {
        case "penulis":
          return <p className="capitalize">{cellValue as string}</p>;
        case "kategori":
          return (
            <Chip
              color="primary"
              size="sm"
              variant="flat"
              className="capitalize"
            >
              {cellValue as string}
            </Chip>
          );
        case "stok": {
          return (
            <Chip
              color={(buku.stok as number) > 0 ? "success" : "danger"}
              variant="flat"
              size="sm"
            >
              {(buku.stok as number) > 0 ? "Tersedia" : "Habis"}
            </Chip>
          );
        }
        case "aksi":
          return (
            <DropdownAction
              hideButtonDelete
              detailLabel={(buku.stok as number) > 0 ? "Pinjam" : "Habis"}
              disabledButtonDetail={(buku.stok as number) <= 0}
              onPressButtonDetail={() => {
                setSelectedId(buku);
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
          columns={COLUMN_LIST_DATABUKU}
          currentLimit={String(currentSize)}
          currentPage={Number(currentPage)}
          data={dataBooks?.data || []}
          emptyContent="Data buku tidak ditemukan"
          filterBy={filterBy}
          filterOptions={[
            { key: "judul", label: "Judul Buku" },
            { key: "kategori", label: "Kategori" },
          ]}
          handleChangeLimit={handleChangeSize}
          handleChangePage={handleChangePage}
          handleClearSearch={handleClearSearch}
          handleSearch={handleSearch}
          isLoading={isLoadingBook || isRefetchingBook}
          onSelectionChange={handleFilterSearch}
          renderCell={renderCell}
          showLimit
          showSearch
          totalPages={dataBooks?.paging?.totalPage || 1}
        />
      )}

      <BorrowBookModal
        {...disclosureBorrowModal}
        refetchBook={refetchBook}
        selectedBook={selectedId}
        setSelectedBook={setSelectedId}
      />
    </section>
  );
};

export default DataBuku;
