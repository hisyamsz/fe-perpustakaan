import DashboardLayout from "@/components/layouts/DashboardLayout";
import DataBuku from "@/components/views/Admin/DataBuku";

const AdminDashboardPage = () => {
  return (
    <DashboardLayout
      title="Data Buku"
      description="Kelola data buku di sini"
      type="admin"
    >
      <DataBuku />
    </DashboardLayout>
  );
};

export default AdminDashboardPage;
