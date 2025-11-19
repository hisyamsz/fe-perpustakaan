import { IconType } from "react-icons";
import {
  FaBook,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaHistory,
} from "react-icons/fa";
import { FiAlertTriangle, FiLayers } from "react-icons/fi";

export type SummaryKeys =
  | "currentlyBorrowed"
  | "pendingBorrow"
  | "totalBorrow"
  | "dueToday"
  | "overdue"
  | "history";

export interface Summary {
  currentlyBorrowed: number;
  pendingBorrow: number;
  totalBorrow: number;
  dueToday: number;
  overdue: number;
  history: number;
}

export const USER_SUMMARY_ITEMS: {
  key: SummaryKeys;
  title: string;
  icon: IconType;
  textColor: string;
  bgColor: string;
}[] = [
  {
    key: "currentlyBorrowed",
    title: "Sedang Dipinjam",
    icon: FaBook,
    bgColor: "bg-blue-100",
    textColor: "text-blue-600",
  },
  {
    key: "pendingBorrow",
    title: "Menunggu Konfirmasi",
    icon: FiAlertTriangle,
    bgColor: "bg-amber-100",
    textColor: "text-amber-600",
  },
  {
    key: "dueToday",
    title: "Jatuh Tempo Hari Ini",
    icon: FaClock,
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-600",
  },
  {
    key: "overdue",
    title: "Terlambat",
    icon: FaExclamationTriangle,
    bgColor: "bg-red-100",
    textColor: "text-red-600",
  },
  {
    key: "history",
    title: "Riwayat Peminjaman",
    icon: FaHistory,
    bgColor: "bg-green-100",
    textColor: "text-green-600",
  },
  {
    key: "totalBorrow",
    title: "Total Peminjaman",
    icon: FiLayers,
    bgColor: "bg-indigo-100",
    textColor: "text-indigo-600",
  },
];
