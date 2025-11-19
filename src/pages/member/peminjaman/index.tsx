import DashboardLayout from "@/components/layouts/DashboardLayout";
import Peminjaman from "@/components/views/Member/Peminjaman";

const MemberPeminjamanPage = () => {
  return (
    <DashboardLayout
      title="Peminjaman"
      description="Halaman ini menampilkan informasi peminjaman buku Anda, termasuk judul buku, tanggal pinjam, tanggal tenggat pengembalian, serta status peminjaman."
      type="user"
    >
      <Peminjaman />
    </DashboardLayout>
  );
};

export default MemberPeminjamanPage;
