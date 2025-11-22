import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import Link from "next/link";
import { FC } from "react";
import { FaBookOpen } from "react-icons/fa";

const Custom404: FC = () => {
  return (
    <LandingPageLayout
      title="404 Page Not Found"
      description="Halaman tidak ditemukan"
    >
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-linear-to-b from-gray-50 via-white to-gray-50 px-6 text-center">
        <div className="animate-bounce-slow mb-6">
          <FaBookOpen className="text-primary-600 text-7xl drop-shadow-sm md:text-8xl" />
        </div>

        <h1 className="mb-4 text-6xl font-extrabold tracking-tight text-gray-800 md:text-7xl">
          404
        </h1>

        <p className="mb-8 max-w-md text-gray-600 md:text-lg">
          Halaman tidak tersedia di perpustakaan kami. Mari kembali dan cari
          buku favoritmu.
        </p>

        <Link
          href="/"
          className="bg-primary-600 hover:bg-primary-700 rounded-xl px-7 py-3 text-white shadow-lg transition-all hover:shadow-xl"
        >
          Kembali ke Beranda
        </Link>

        <div className="bg-primary-300 mt-10 h-1 w-28 rounded-full opacity-60"></div>
      </div>
    </LandingPageLayout>
  );
};

export default Custom404;
