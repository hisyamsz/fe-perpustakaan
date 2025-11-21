import { Card, CardBody, CardHeader } from "@heroui/react";
import { Accordion, AccordionItem } from "@heroui/react";
import { FaSchool, FaEye, FaBullseye } from "react-icons/fa";
import { FC } from "react";
import { ACCORDION_MISI_LIST, FACILITIES_LIST } from "./Tentang.constants";

const Tentang: FC = () => {
  return (
    <section className="min-h-screen py-12" aria-labelledby="tentang-heading">
      <div className="container mx-auto px-4 md:px-0">
        <div className="mx-auto max-w-4xl">
          <header className="text-center">
            <h1
              id="tentang-heading-title"
              className="mb-4 text-4xl font-bold drop-shadow-md md:text-5xl"
            >
              Tentang Perpustakaan
            </h1>

            <p className="text-foreground-600 mx-auto mb-12 max-w-3xl text-lg">
              Pusat literasi modern yang mendukung proses belajar, pengembangan
              karakter, serta peningkatan kualitas pendidikan di SMKN 6 Kota
              Tangerang Selatan.
            </p>
          </header>

          <article aria-labelledby="about-title">
            <Card className="mb-10 shadow-md">
              <CardHeader className="flex items-center gap-3">
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
                  <FaSchool className="text-primary h-6 w-6" />
                </div>
                <h2 id="about-title" className="text-2xl font-bold">
                  Tentang Kami
                </h2>
              </CardHeader>

              <CardBody>
                <p className="text-foreground-600 leading-relaxed">
                  Perpustakaan SMKN 6 Kota Tangerang Selatan merupakan pusat
                  informasi dan sumber belajar yang dirancang untuk mendukung
                  proses pendidikan. Dengan koleksi buku fisik dan digital,
                  fasilitas nyaman, serta layanan ramah, kami berkomitmen untuk
                  menciptakan lingkungan belajar yang produktif dan menyenangkan
                  bagi seluruh warga sekolah.
                </p>
              </CardBody>
            </Card>
          </article>

          <section aria-labelledby="visi-misi-title">
            <h2 id="visi-misi-title" className="sr-only">
              Visi dan Misi Perpustakaan
            </h2>

            <Accordion variant="shadow" itemClasses={{ content: "pb-6" }}>
              <AccordionItem
                key="visi"
                aria-label="Visi Perpustakaan SMKN 6"
                title={
                  <div className="flex items-center gap-3">
                    <div className="bg-accent/10 flex h-10 w-10 items-center justify-center rounded-full">
                      <FaEye className="text-accent h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold">Visi Kami</h3>
                  </div>
                }
              >
                <p className="text-foreground-600 leading-relaxed">
                  Menjadi pusat literasi unggulan yang mendukung pembelajaran
                  sepanjang hayat, menumbuhkan kreativitas, serta memperkuat
                  karakter melalui akses informasi yang berkualitas dan
                  inklusif.
                </p>
              </AccordionItem>

              <AccordionItem
                key="misi"
                aria-label="Misi Perpustakaan SMKN 6"
                title={
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                      <FaBullseye className="text-primary h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold">Misi Kami</h3>
                  </div>
                }
              >
                <ul className="text-foreground-600 space-y-2 leading-relaxed">
                  {ACCORDION_MISI_LIST.map((misi, index) => (
                    <li key={index}>{misi.label}</li>
                  ))}
                </ul>
              </AccordionItem>
            </Accordion>
          </section>

          <section className="mt-16" aria-labelledby="facilities-title">
            <h2
              id="facilities-title"
              className="mb-8 text-center text-3xl font-bold"
            >
              Fasilitas Perpustakaan
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {FACILITIES_LIST.map((facility, i) => (
                <Card
                  key={i}
                  aria-label={`Fasilitas: ${facility.title}`}
                  className="shadow-md transition-all duration-300 hover:shadow-lg"
                >
                  <CardHeader className="flex items-center gap-3">
                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                      <facility.icon className="text-primary h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold">{facility.title}</h3>
                  </CardHeader>

                  <CardBody>
                    <p className="text-foreground-600">
                      {facility.description}
                    </p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default Tentang;
