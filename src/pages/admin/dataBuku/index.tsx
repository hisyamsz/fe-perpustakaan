import DashboardLayout from "@/components/layouts/DashboardLayout";
import DataBuku from "@/components/views/Admin/DataBuku";

const AdminDashboardPage = () => {
  return (
    <DashboardLayout
      title="Data Buku"
      description="Kelola informasi buku dalam perpustakaan."
      type="admin"
    >
      <DataBuku />
    </DashboardLayout>
  );
};

export default AdminDashboardPage;
