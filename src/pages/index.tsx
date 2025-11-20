import Home from "@/components/views/Home";
import LandingPageLayout from "@/components/layouts/LandingPageLayout";

export default function HomePage() {
  return (
    <LandingPageLayout
      title="Perpustakaan SMKN 6 Kota Tangerang Selatan"
      description="Temukan koleksi buku terbaru, informasi peminjaman, dan layanan perpustakaan SMKN 6 Kota Tangerang Selatan. Akses mudah untuk siswa dan guru secara online."
    >
      <Home />
    </LandingPageLayout>
  );
}
