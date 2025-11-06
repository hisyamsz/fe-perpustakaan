import Image from "next/image";
import Link from "next/link";
import * as React from "react";

interface DashboardLayoutNavbarProps {
  propName?: string;
}

const DashboardLayoutNavbar: React.FC<DashboardLayoutNavbarProps> = () => {
  return (
    <header className="bg-primary flex w-full items-center gap-4 px-6 py-2">
      <Link href="/">
        <Image
          src="/images/general/logo-smkn-6.png"
          alt="Logo"
          width={80}
          height={80}
          className="h-10 w-10"
        />
      </Link>
      <p className="text-sm font-medium text-white lg:text-base">
        Perpustakaan SMKN 6 Kota Tangerang Selatan
      </p>
    </header>
  );
};

export default DashboardLayoutNavbar;
