import DataTable from "@/components/ui/DataTable";
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { useRouter } from "next/router";
import { FC, Key, ReactNode, useCallback } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LIST_DATABUKU } from "./DataBuku.constants";

interface DataBukuProps {
  propName?: string;
}

const DataBuku: FC<DataBukuProps> = () => {
  const router = useRouter();

  const renderCell = useCallback(
    (dataBuku: Record<string, unknown>, columnKey: Key) => {
      const cellValue = dataBuku[columnKey as keyof typeof dataBuku];

      switch (columnKey) {
        case "kategori":
          return (
            <Chip className="uppercase" variant="flat">
              {dataBuku.kategori as string}
            </Chip>
          );
        case "actions":
          return (
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="flat">
                  <CiMenuKebab className="text-text" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Data Buku Table Columns">
                <DropdownItem key="edit-databuku" onPress={() => {}}>
                  Edit
                </DropdownItem>
                <DropdownItem
                  key="hapus-databuku"
                  className="text-danger-500"
                  color="danger"
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
        renderCell={renderCell}
        columns={COLUMN_LIST_DATABUKU}
        data={[
          {
            id: 12312,
            judul: "Apa Aja",
            pengarang: "Siapa ya",
            kategori: "umum",
            penerbit: "ujang",
            tahun_terbit: 2004,
            stok: 2,
          },
        ]}
      />
    </section>
  );
};

export default DataBuku;
