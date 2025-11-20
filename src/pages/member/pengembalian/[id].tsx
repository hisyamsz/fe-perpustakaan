import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailPengembalian from "@/components/views/DetailPengembalian";
import { FC } from "react";

const AdminDetailPengembalianPage: FC = () => {
  return (
    <DashboardLayout
      title="Detail Pengembalian"
      description="Informasi mengenai detail pengembalian buku."
      type="user"
    >
      <DetailPengembalian />
    </DashboardLayout>
  );
};

export default AdminDetailPengembalianPage;
