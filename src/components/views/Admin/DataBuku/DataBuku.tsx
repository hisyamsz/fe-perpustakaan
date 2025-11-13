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
import { useCallback, Key, ReactNode } from "react";
import { COLUMN_LIST_DATABUKU } from "./DataBuku.constants";
import AddDataBukuModal from "./AddDataBukuModal";

const dummyData = [
  {
    id: 1,
    judul: "Algoritma Pemrograman",
    penulis: "Ahmad Fauzi",
    kategori: "Teknologi",
    penerbit: "Informatika Press",
    tahun_terbit: 2020,
    stok: 5,
  },
  {
    id: 2,
    judul: "Belajar Database MySQL",
    penulis: "Siti Rahma",
    kategori: "Basis Data",
    penerbit: "Andi Publisher",
    tahun_terbit: 2019,
    stok: 3,
  },
  {
    id: 3,
    judul: "Dasar Pemrograman Web",
    penulis: "Hisyam Santoso",
    kategori: "Web",
    penerbit: "Tekno Media",
    tahun_terbit: 2022,
    stok: 10,
  },
];

const DataBuku = () => {
  const disclosureAddDataBukuModal = useDisclosure();

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
      <DataTable
        buttonTopContentLabel="Tambah Buku"
        onPressButtonTopContent={disclosureAddDataBukuModal.onOpen}
        columns={COLUMN_LIST_DATABUKU}
        data={dummyData}
        renderCell={renderCell}
        searchFields={["judul", "kategori"]} // 🔍 Bisa cari di dua kolom
        searchPlaceholder="Cari berdasarkan judul atau kategori..."
      />
      <AddDataBukuModal
        {...disclosureAddDataBukuModal}
        refetchBook={() => {}}
      />
    </section>
  );
};

export default DataBuku;
