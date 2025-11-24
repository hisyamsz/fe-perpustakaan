import { CiMail, CiMapPin, CiPhone } from "react-icons/ci";

export const NAVBAR_ITEMS = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "/tentang" },
  { label: "Koleksi Buku", href: "/koleksi-buku" },
];

export const CONTACT_INFO = [
  {
    key: "location",
    icon: CiMapPin,
    label: "Jl. Magnolia VI No. 6",
  },
  { key: "phone", icon: CiPhone, label: "0859-0010-0806" },
  { key: "mail", icon: CiMail, label: "smkn6tangsel@gmail.com" },
];
