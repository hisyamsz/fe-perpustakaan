import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Admin/Dashboard";
import statServices from "@/services/Stat.service";
import { IStatistic } from "@/types/Stat";
import { FC } from "react";

interface AdminDashboardPage {
  dataStat?: IStatistic;
}

const AdminDashboardPage: FC<AdminDashboardPage> = ({ dataStat }) => {
  return (
    <DashboardLayout
      title="Admin Dashboard"
      description="Selamat Datang di Perpustakaan SMKN 6 Kota Tangerang Selatan"
      type="admin"
    >
      <Dashboard dataStat={dataStat} />
    </DashboardLayout>
  );
};

export async function getServerSideProps() {
  try {
    const { data } = await statServices.getStat();

    return {
      props: {
        dataStat: data.data,
      },
    };
  } catch {
    return {
      props: {
        dataStat: null,
      },
    };
  }
}

export default AdminDashboardPage;
