import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

interface DashboardLayoutNavbarProps {
  open?: boolean;
}

const DashboardLayoutNavbar: React.FC<DashboardLayoutNavbarProps> = () => {
  return (
    <header className={cn("bg-primary flex px-6 py-2")}>
      <Link
        href="/"
        className="flex items-center gap-4 text-white hover:text-white/70"
      >
        <Image
          src="/images/general/logo-smkn-6.png"
          alt="Logo"
          width={48}
          height={48}
          className="h-10 w-10"
        />
        <p className="text-sm font-medium lg:text-base">
          Perpustakaan SMKN 6 Kota Tangerang Selatan
        </p>
      </Link>
    </header>
  );
};

export default DashboardLayoutNavbar;
