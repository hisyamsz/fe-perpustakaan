import { CiBookmark, CiGrid41, CiUser } from "react-icons/ci";
import { LuBookOpen } from "react-icons/lu";

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
    href: "/admin/dataBuku",
    icon: <LuBookOpen />,
  },
  {
    key: "peminjaman",
    label: "Peminjaman",
    href: "/admin/peminjaman",
    icon: <CiBookmark />,
  },
];

export const SIDEBAR_USER = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/member/dashboard",
    icon: <CiGrid41 />,
  },
  {
    key: "books",
    label: "Data Buku",
    href: "/member/dataBuku",
    icon: <LuBookOpen />,
  },
  {
    key: "peminjaman",
    label: "Peminjaman",
    href: "/member/peminjaman",
    icon: <CiBookmark />,
  },
  {
    key: "profile",
    label: "Profile",
    href: "/member/profile",
    icon: <CiUser />,
  },
];
