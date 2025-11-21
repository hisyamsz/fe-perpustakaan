import { useQuery } from "@tanstack/react-query";
import statsServices from "@/services/stats.service";

const useDashboard = () => {
  const getStatUser = async () => {
    const { data } = await statsServices.getStatUser();
    return data.data;
  };

  const { data: dataStatUser, isPending: isPendingStatUser } = useQuery({
    queryKey: ["UserSummary"],
    queryFn: getStatUser,
    staleTime: 1000 * 60 * 3,
    gcTime: 1000 * 60 * 10,
  });

  return {
    dataStatUser,
    isPendingStatUser,
  };
};

export default useDashboard;
