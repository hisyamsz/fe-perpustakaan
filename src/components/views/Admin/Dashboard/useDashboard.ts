import statsServices from "@/services/stats.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDashboard = () => {
  const router = useRouter();

  const getStats = async () => {
    const { data } = await statsServices.getStat();
    return data.data;
  };

  const { data: dataStats, isPending: isPendingStats } = useQuery({
    queryKey: ["Statistic"],
    queryFn: getStats,
    enabled: router.isReady,
  });

  return {
    dataStats,
    isPendingStats,
  };
};

export default useDashboard;
