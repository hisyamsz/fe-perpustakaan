import DataTable from "@/components/ui/DataTable";
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@heroui/react";
import { CiMenuKebab } from "react-icons/ci";
import { useCallback, Key, ReactNode, useEffect, FC } from "react";
import { COLUMN_LIST_DATABUKU } from "./DataBuku.constants";
import AddDataBukuModal from "./AddDataBukuModal";
import useDataBuku from "./useDataBuku";
import { useRouter } from "next/router";

const DataBuku: FC = () => {
  const { isReady, query } = useRouter();
  const {
    currentPage,
    currentSize,
    dataBooks,
    handleChangePage,
    handleChangeSize,
    handleClearSearch,
    handleSearch,
    isLoadingBook,
    isRefetchingBook,
    refetchBook,
    setUrl,
  } = useDataBuku();

  const disclosureAddDataBukuModal = useDisclosure();

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
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="flat">
                  <CiMenuKebab />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="edit">Edit</DropdownItem>
                <DropdownItem
                  key="hapus"
                  color="danger"
                  className="text-danger"
                >
                  Hapus
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [],
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
          handleChangeLimit={handleChangeSize}
          handleChangePage={handleChangePage}
          handleClearSearch={handleClearSearch}
          handleSearch={handleSearch}
          isLoading={isLoadingBook || isRefetchingBook}
          onClickButtonTopContent={disclosureAddDataBukuModal.onOpen}
          renderCell={renderCell}
          showLimit
          showSearch
          totalPages={dataBooks?.paging?.totalPage || 1}
        />
      )}

      <AddDataBukuModal
        {...disclosureAddDataBukuModal}
        refetchBook={refetchBook}
      />
    </section>
  );
};

export default DataBuku;
