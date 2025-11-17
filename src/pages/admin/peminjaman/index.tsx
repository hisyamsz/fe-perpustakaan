import DashboardLayout from "@/components/layouts/DashboardLayout";
import Peminjaman from "@/components/views/Admin/Peminjaman";
import { FC } from "react";

const AdminPeminjamanPage: FC = () => {
  return (
    <DashboardLayout
      title="Peminjaman"
      description="Kelola dan konfirmasi permintaan peminjaman buku dari pengguna."
      type="admin"
    >
      <Peminjaman />
    </DashboardLayout>
  );
};

export default AdminPeminjamanPage;
