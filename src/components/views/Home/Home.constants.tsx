import { ChipProps } from "@heroui/react";
import { BiSolidCity } from "react-icons/bi";
import { CiClock1 } from "react-icons/ci";
import { ImBooks } from "react-icons/im";
import { IoIosPeople } from "react-icons/io";

export const HOME_INFO = [
  {
    icon: CiClock1,
    title: "Jam Buka",
    details: [
      "Senin - Jum'at: 8:00 - 16.00 WIB",
      "Sabtu: 9:00 - 16:00 WIB",
      "Minggu: Tutup",
    ],
    color: "text-primary",
  },
  {
    icon: IoIosPeople,
    title: "Kegiatan Literasi",
    details: [
      "Program baca bersama",
      "Bedah buku",
      "Pelatihan literasi digital",
    ],
    color: "text-secondary",
  },
  {
    icon: ImBooks,
    title: "Koleksi Buku",
    details: ["Buku pelajaran", "Materi kompetensi kejuruan", "Laporan"],
    color: "text-primary",
  },
  {
    icon: BiSolidCity,
    title: "Fasilitas",
    details: ["Area baca nyaman", "Komputer", "Wi-Fi untuk riset"],
    color: "text-accent",
  },
];

export const CATEGORY_COLORS: Record<string, ChipProps["color"]> = {
  fiksi: "primary",
  "non-fiksi": "secondary",
  novel: "success",
  komik: "warning",
  biografi: "danger",
  pelajaran: "primary",
  ensiklopedia: "success",
  teknologi: "secondary",
  agama: "warning",
  sejarah: "danger",
};

export const CATEGORY_STYLES: Record<
  string,
  {
    iconColor: string; // warna untuk icon
    coverBg: string; // warna bg cover icon
  }
> = {
  fiksi: {
    iconColor: "text-blue-500",
    coverBg: "bg-blue-100",
  },
  "non-fiksi": {
    iconColor: "text-purple-500",
    coverBg: "bg-purple-100",
  },
  novel: {
    iconColor: "text-green-600",
    coverBg: "bg-green-100",
  },
  komik: {
    iconColor: "text-yellow-500",
    coverBg: "bg-yellow-100",
  },
  biografi: {
    iconColor: "text-red-500",
    coverBg: "bg-red-100",
  },
  pelajaran: {
    iconColor: "text-sky-600",
    coverBg: "bg-sky-100",
  },
  ensiklopedia: {
    iconColor: "text-teal-600",
    coverBg: "bg-teal-100",
  },
  teknologi: {
    iconColor: "text-indigo-600",
    coverBg: "bg-indigo-100",
  },
  agama: {
    iconColor: "text-amber-600",
    coverBg: "bg-amber-100",
  },
  sejarah: {
    iconColor: "text-rose-600",
    coverBg: "bg-rose-100",
  },
};
