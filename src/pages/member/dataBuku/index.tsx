import DashboardLayout from "@/components/layouts/DashboardLayout";
import DataBuku from "@/components/views/Member/DataBuku";

const MemberDataBukuPage = () => {
  return (
    <DashboardLayout
      title="Data Buku"
      description="Temukan dan lihat koleksi buku yang tersedia untuk dipinjam"
      type="user"
    >
      <DataBuku />
    </DashboardLayout>
  );
};

export default MemberDataBukuPage;
