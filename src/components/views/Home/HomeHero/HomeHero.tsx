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
    <section className="bg-auth relative flex h-[500px] w-full bg-cover bg-center pt-10 md:pt-18">
      <div className="to-accent/30 absolute inset-0 bg-linear-to-r from-sky-800/80 via-cyan-400/30" />

      <div className="relative z-10 flex max-w-[800px] flex-col items-start gap-6 px-6 text-start text-white 2xl:max-w-[1000px]">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold drop-shadow-lg md:text-4xl lg:text-5xl 2xl:text-6xl">
            Selamat Datang Di Perpustakaan SMKN 6 Kota Tangerang Selatan
          </h2>
          <p className="text-default-200 2xl:text-lg">
            Jelajahi ribuan koleksi buku, jurnal, dan sumber belajar digital
            untuk mendukung perjalanan pendidikanmu.
          </p>
        </div>
        <Button color="secondary" onPress={() => router.push("/books")}>
          <LuBookOpen /> Lihat Katalog
        </Button>
      </div>
    </section>
  );
};

export default HomeHero;
