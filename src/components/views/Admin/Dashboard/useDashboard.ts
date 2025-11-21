import statsServices from "@/services/stats.service";
import { useQuery } from "@tanstack/react-query";

const useDashboard = () => {
  const getStats = async () => {
    const { data } = await statsServices.getStat();
    return data.data;
  };

  const { data: dataStats, isPending: isPendingStats } = useQuery({
    queryKey: ["Statistic"],
    queryFn: getStats,
    staleTime: 1000 * 60 * 3,
    gcTime: 1000 * 60 * 10,
  });

  return {
    dataStats,
    isPendingStats,
  };
};

export default useDashboard;
