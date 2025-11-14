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
      "Sabtu: 9:00 AM - 16:00 WIB",
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
    details: ["Buku pelajarann", "Materi kompetensi kejuruan", "Laporan"],
    color: "text-primary",
  },
  {
    icon: BiSolidCity,
    title: "Fasilitas",
    details: ["Area baca nyaman", "Komputer", "Wi-Fi untuk riset"],
    color: "text-accent",
  },
];
