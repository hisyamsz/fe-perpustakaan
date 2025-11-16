import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@heroui/react";
import { useCallback, Key, ReactNode, useEffect, FC } from "react";
import { COLUMN_LIST_DATABUKU } from "./DataBuku.constants";
import AddDataBukuModal from "./AddDataBukuModal";
import useDataBuku from "./useDataBuku";
import { useRouter } from "next/router";
import DeleteDataBukuModal from "./DeleteDataBukuModal";
import DropdownAction from "@/components/commons/DropdownAction";
import UpdateDataBukuModal from "./UpdateDataBukuModal";

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
    handleSearch,
    isLoadingBook,
    isRefetchingBook,
    refetchBook,
    setUrl,
    handleFilterSearch,
    selectedId,
    setSelectedId,
  } = useDataBuku();

  const disclosureAddDataBukuModal = useDisclosure();
  const disclosureUpdateDataBukuModal = useDisclosure();
  const disclosureDeleteDataBukuModal = useDisclosure();

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
        case "aksi":
          return (
            <DropdownAction
              detailLabel="Edit"
              onPressButtonDetail={() => {
                setSelectedId(buku);
                disclosureUpdateDataBukuModal.onOpen();
              }}
              deleteLabel="Hapus"
              onPressButtonDelete={() => {
                setSelectedId(buku);
                disclosureDeleteDataBukuModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [
      setSelectedId,
      disclosureDeleteDataBukuModal,
      disclosureUpdateDataBukuModal,
    ],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          buttonTopContentLabel="Tambah Buku"
          columns={COLUMN_LIST_DATABUKU}
          currentLimit={String(currentSize)}
          currentPage={Number(currentPage)}
          data={dataBooks?.data || []}
          emptyContent="Data buku tidak ditemukan"
          filterBy={filterBy}
          handleChangeLimit={handleChangeSize}
          handleChangePage={handleChangePage}
          handleClearSearch={handleClearSearch}
          handleSearch={handleSearch}
          isLoading={isLoadingBook || isRefetchingBook}
          onClickButtonTopContent={disclosureAddDataBukuModal.onOpen}
          renderCell={renderCell}
          showLimit
          showSearch
          onSelectionChange={handleFilterSearch}
          totalPages={dataBooks?.paging?.totalPage || 1}
        />
      )}

      <AddDataBukuModal
        {...disclosureAddDataBukuModal}
        refetchBook={refetchBook}
      />
      <UpdateDataBukuModal
        {...disclosureUpdateDataBukuModal}
        refetchBook={refetchBook}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
      <DeleteDataBukuModal
        {...disclosureDeleteDataBukuModal}
        refetchBook={refetchBook}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </section>
  );
};

export default DataBuku;
