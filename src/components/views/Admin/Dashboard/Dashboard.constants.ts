import { FaBookOpen, FaUsers, FaSyncAlt, FaClock } from "react-icons/fa";

export const STATS_CARD = [
  {
    title: "Total Buku",
    key: "total_buku",
    icon: FaBookOpen,
    textColor: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    title: "Total Anggota",
    key: "total_anggota",
    icon: FaUsers,
    textColor: "text-green-500",
    bgColor: "bg-green-100",
  },
  {
    title: "Buku Dipinjam",
    key: "buku_dipinjam",
    icon: FaSyncAlt,
    textColor: "text-yellow-500",
    bgColor: "bg-yellow-100",
  },
  {
    title: "Buku Terlambat",
    key: "buku_terlambat",
    icon: FaClock,
    textColor: "text-red-500",
    bgColor: "bg-red-100",
  },
];

export const COLUMN_LIST_RECENT_ACTIVITY = [
  { name: "PEMINJAM", uid: "peminjam" },
  { name: "BUKU", uid: "buku" },
  { name: "TANGGAL PINJAM", uid: "tanggal_pinjam" },
  { name: "TENGGAT", uid: "tenggat_kembali" },
  { name: "STATUS", uid: "status" },
];
