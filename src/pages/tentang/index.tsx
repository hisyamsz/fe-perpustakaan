import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import Tentang from "@/components/views/Tentang";

export default function TentangPage() {
  return (
    <LandingPageLayout
      title="Tentang - Perpustakaan SMKN 6 Kota Tangerang Selatan"
      description="Pelajari profil, visi misi, dan layanan Perpustakaan SMKN 6 Kota Tangerang Selatan yang mendukung kegiatan belajar siswa dan guru melalui koleksi dan fasilitas lengkap."
    >
      <Tentang />
    </LandingPageLayout>
  );
}
