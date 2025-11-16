import DashboardLayout from "@/components/layouts/DashboardLayout";
import DataBuku from "@/components/views/Member/DataBuku";

const MemberDataBukuPage = () => {
  return (
    <DashboardLayout
      title="Data Buku"
      description="Cari buku dan pinjam"
      type="user"
    >
      <DataBuku />
    </DashboardLayout>
  );
};

export default MemberDataBukuPage;
