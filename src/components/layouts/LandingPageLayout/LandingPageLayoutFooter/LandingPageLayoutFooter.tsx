import * as React from "react";

interface LandingPageLayoutFooterProps {
  propName?: string;
}

const LandingPageLayoutFooter: React.FC<LandingPageLayoutFooterProps> = () => {
  return (
    <footer className="mx-auto flex w-full flex-col-reverse items-center justify-center gap-4 bg-linear-to-r from-sky-800 to-sky-900 px-14 py-8 text-center text-white lg:flex-row lg:justify-between">
      <p className="">&copy; 2025 Perpustakaan SMKN 6 Kota Tangerang Selatan</p>
      <p className="text-sm">Jam buka: Senin — Jumat 08:00 — 16:00 WIB</p>
    </footer>
  );
};

export default LandingPageLayoutFooter;
