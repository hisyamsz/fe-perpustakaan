import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import KoleksiBuku from "@/components/views/KoleksiBuku";

export default function KoleksiBukuPage() {
  return (
    <LandingPageLayout
      title="KoleksiBuku - Perpustakaan SMKN 6 Kota Tangerang Selatan"
      description="Pelajari profil, visi misi, dan layanan Perpustakaan SMKN 6 Kota Tangerang Selatan yang mendukung kegiatan belajar siswa dan guru melalui koleksi dan fasilitas lengkap."
    >
      <KoleksiBuku />
    </LandingPageLayout>
  );
}
