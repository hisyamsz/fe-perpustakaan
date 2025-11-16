import DashboardLayout from "@/components/layouts/DashboardLayout";
import Peminjaman from "@/components/views/Admin/Peminjaman";
import { FC } from "react";

const AdminPeminjamanPage: FC = () => {
  return (
    <DashboardLayout
      title="Manajemen Peminjaman"
      description="Kelola dan konfirmasi permintaan peminjaman buku dari pengguna. Admin dapat meninjau detail peminjaman sebelum menyetujui atau menolak permintaan."
      type="admin"
    >
      <Peminjaman />
    </DashboardLayout>
  );
};

export default AdminPeminjamanPage;
