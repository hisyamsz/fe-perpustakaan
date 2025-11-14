import { Button } from "@heroui/react";
import { useRouter } from "next/router";
import * as React from "react";
import { LuBookOpen } from "react-icons/lu";

interface HomeHeroProps {
  propName?: string;
}

const HomeHero: React.FC<HomeHeroProps> = () => {
  const router = useRouter();

  return (
    <header
      className="bg-auth relative flex h-[500px] w-full bg-cover bg-center pt-10 md:pt-18"
      role="banner"
      aria-label="Perpustakaan SMKN 6 Kota Tangerang Selatan Hero Section"
    >
      <div
        className="to-accent/30 absolute inset-0 bg-linear-to-r from-sky-800/80 via-cyan-400/30"
        aria-hidden="true"
      />

      <div className="relative z-10 flex max-w-[800px] flex-col items-start gap-6 px-6 text-start text-white 2xl:max-w-[1000px]">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold drop-shadow-lg md:text-4xl lg:text-5xl 2xl:text-6xl">
            Selamat Datang di Perpustakaan SMKN 6 Kota Tangerang Selatan
          </h1>

          <p className="text-default-200 2xl:text-lg">
            Temukan ribuan koleksi buku, jurnal, dan sumber belajar digital yang
            mendukung proses pembelajaran. Akses mudah, cepat, dan modern untuk
            seluruh siswa serta guru.
          </p>
        </div>

        <Button
          color="secondary"
          onPress={() => router.push("/books")}
          aria-label="Lihat katalog buku perpustakaan"
        >
          <LuBookOpen aria-hidden="true" /> Lihat Katalog
        </Button>
      </div>
    </header>
  );
};

export default HomeHero;
