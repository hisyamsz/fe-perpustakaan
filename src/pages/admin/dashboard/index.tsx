import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Admin/Dashboard";
import { FC } from "react";

const AdminDashboardPage: FC = () => {
  return (
    <DashboardLayout
      title="Dashboard"
      description="Selamat Datang di Perpustakaan SMKN 6 Kota Tangerang Selatan"
      type="admin"
    >
      <Dashboard />
    </DashboardLayout>
  );
};

export default AdminDashboardPage;
