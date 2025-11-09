import { CiBookmark, CiGrid41, CiUser } from "react-icons/ci";
import { LuBookOpen } from "react-icons/lu";
import { TbReportAnalytics } from "react-icons/tb";

export const SIDEBAR_ADMIN = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: <CiGrid41 />,
  },
  {
    key: "books",
    label: "Data Buku",
    href: "/admin/books",
    icon: <LuBookOpen />,
  },
  {
    key: "peminjaman",
    label: "Peminjaman",
    href: "/admin/peminjaman",
    icon: <CiBookmark />,
  },
  {
    key: "laporan",
    label: "Laporan Buku",
    href: "/admin/laporan",
    icon: <TbReportAnalytics />,
  },
  {
    key: "profile",
    label: "Profile",
    href: "/admin/profile",
    icon: <CiUser />,
  },
];

export const SIDEBAR_USER = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: <CiGrid41 />,
  },
  {
    key: "books",
    label: "Data Buku",
    href: "/admin/books",
    icon: <LuBookOpen />,
  },
  {
    key: "peminjaman",
    label: "Peminjaman",
    href: "/admin/peminjaman",
    icon: <CiBookmark />,
  },
  {
    key: "laporan",
    label: "Laporan Buku",
    href: "/admin/laporan",
    icon: <TbReportAnalytics />,
  },
  {
    key: "profile",
    label: "Profile",
    href: "/admin/profile",
    icon: <CiUser />,
  },
];
