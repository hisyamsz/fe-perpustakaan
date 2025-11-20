import { CiMail, CiMapPin, CiPhone } from "react-icons/ci";

export const NAVBAR_ITEMS = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "/tentang" },
  { label: "Koleksi Buku", href: "/books" },
];

export const CONTACT_INFO = [
  { key: "location", icon: CiMapPin, label: "SMKN 6 Kota Tangerang Selatan" },
  { key: "phone", icon: CiPhone, label: "(021) 123-4567" },
  { key: "mail", icon: CiMail, label: "perpustakaan@smkn6tangsel.sch.id" },
];
