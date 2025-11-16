import DashboardLayout from "@/components/layouts/DashboardLayout";
import DataBuku from "@/components/views/Admin/DataBuku";

const AdminDashboardPage = () => {
  return (
    <DashboardLayout
      title="Manajemen Data Buku"
      description="Kelola informasi buku dalam perpustakaan. Admin dapat menambah, memperbarui, atau menghapus data buku sesuai kebutuhan."
      type="admin"
    >
      <DataBuku />
    </DashboardLayout>
  );
};

export default AdminDashboardPage;
