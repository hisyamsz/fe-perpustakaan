import { FC, Key, ReactNode, useCallback } from "react";
import { Chip } from "@heroui/react";
import { FaBook, FaUser, FaCalendarAlt } from "react-icons/fa";
import DataTable from "@/components/ui/DataTable";

const DashboardRecentActivity: FC = () => {
  // 🧱 Kolom tabel
  const columns = [
    { name: "Nama Anggota", uid: "user" },
    { name: "Judul Buku", uid: "book" },
    { name: "Status", uid: "status" },
    { name: "Tanggal Kembali", uid: "date", sortable: true },
  ];

  const data = [
    {
      id: 1,
      user: "Hisyam Santoso",
      book: "Algoritma dan Struktur Data",
      status: "Dipinjam",
      date: "2025-11-11",
    },
    {
      id: 2,
      user: "Siti Nurhaliza",
      book: "Pemrograman Web Dasar",
      status: "Dikembalikan",
      date: "2025-11-10",
    },
    {
      id: 3,
      user: "Ahmad Fauzan",
      book: "Matematika Kelas XII",
      status: "Dipinjam",
      date: "2025-11-09",
    },
    {
      id: 4,
      user: "Dewi Lestari",
      book: "Fisika Modern",
      status: "Terlambat",
      date: "2025-11-08",
    },
  ];

  const statusColor = (status: string) => {
    switch (status) {
      case "Dipinjam":
        return "warning";
      case "Dikembalikan":
        return "success";
      case "Terlambat":
        return "danger";
      default:
        return "default";
    }
  };

  // ⚡ renderCell pakai useCallback agar efisien
  const renderCell = useCallback(
    (item: Record<string, unknown>, columnKey: Key): ReactNode => {
      const cellValue = item[columnKey as keyof typeof item];

      switch (columnKey) {
        case "user":
          return (
            <div className="flex items-center gap-2">
              <FaUser className="text-gray-500" />
              <span>{cellValue as string}</span>
            </div>
          );

        case "book":
          return (
            <div className="flex items-center gap-2">
              <FaBook className="text-blue-500" />
              <span>{cellValue as string}</span>
            </div>
          );

        case "status":
          return (
            <Chip
              color={statusColor(cellValue as string)}
              size="sm"
              variant="flat"
            >
              {cellValue as string}
            </Chip>
          );

        case "date":
          return (
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-gray-400" />
              <span>{cellValue as string}</span>
            </div>
          );

        default:
          return cellValue as ReactNode;
      }
    },
    [],
  );

  return (
    <div className="mt-10">
      <h2 className="mb-4 text-xl font-semibold">Aktivitas Terbaru</h2>
      <DataTable
        columns={columns}
        data={data}
        renderCell={renderCell}
        disabledSearch
        rowsPerPage={5}
      />
    </div>
  );
};

export default DashboardRecentActivity;
