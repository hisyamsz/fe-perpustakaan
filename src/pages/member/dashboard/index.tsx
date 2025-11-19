import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Member/Dashboard";

const MemberDashboardPage = () => {
  return (
    <DashboardLayout
      title="Dashboard"
      description="Selamat Datang di Perpustakaan SMKN 6 Kota Tangerang Selatan"
      type="user"
    >
      <Dashboard />
    </DashboardLayout>
  );
};

export default MemberDashboardPage;
