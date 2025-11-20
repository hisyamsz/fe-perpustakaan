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
  });

  return {
    dataStatUser,
    isPendingStatUser,
  };
};

export default useDashboard;
