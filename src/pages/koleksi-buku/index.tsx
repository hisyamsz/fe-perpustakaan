import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import KoleksiBuku from "@/components/views/KoleksiBuku";

export default function KoleksiBukuPage() {
  return (
    <LandingPageLayout
      title="KoleksiBuku - Perpustakaan SMKN 6 Kota Tangerang Selatan"
      description="Jelajahi beragam koleksi buku di Perpustakaan SMKN 6 Kota Tangerang Selatan. Temukan buku berdasarkan judul, kategori, serta buku unggulan yang tersedia untuk mendukung kegiatan belajar dan literasi."
    >
      <KoleksiBuku />
    </LandingPageLayout>
  );
}
