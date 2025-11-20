import { UserStatKeys } from "@/types/Stat";
import { IconType } from "react-icons";
import {
  FaBook,
  FaClock,
  FaExclamationTriangle,
  FaHistory,
} from "react-icons/fa";
import { FiAlertTriangle, FiLayers } from "react-icons/fi";

export const USER_SUMMARY_ITEMS: {
  key: UserStatKeys;
  title: string;
  icon: IconType;
  textColor: string;
  bgColor: string;
}[] = [
  {
    key: "dipinjam",
    title: "Sedang Dipinjam",
    icon: FaBook,
    bgColor: "bg-blue-100",
    textColor: "text-blue-600",
  },
  {
    key: "konfirmasi",
    title: "Menunggu Konfirmasi",
    icon: FiAlertTriangle,
    bgColor: "bg-amber-100",
    textColor: "text-amber-600",
  },
  {
    key: "jatuh_tempo",
    title: "Jatuh Tempo",
    icon: FaClock,
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-600",
  },
  {
    key: "terlambat",
    title: "Terlambat",
    icon: FaExclamationTriangle,
    bgColor: "bg-red-100",
    textColor: "text-red-600",
  },
  {
    key: "riwayat_peminjaman",
    title: "Riwayat",
    icon: FaHistory,
    bgColor: "bg-green-100",
    textColor: "text-green-600",
  },
  {
    key: "total_peminjaman",
    title: "Total Peminjaman",
    icon: FiLayers,
    bgColor: "bg-indigo-100",
    textColor: "text-indigo-600",
  },
];
