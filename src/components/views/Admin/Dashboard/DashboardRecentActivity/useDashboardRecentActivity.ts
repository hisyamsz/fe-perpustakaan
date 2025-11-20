import borrowServices from "@/services/borrow.service";
import { useQuery } from "@tanstack/react-query";

const useDashboardRecentActivity = () => {
  const getBorrows = async () => {
    const params = {
      size: 5,
      page: 1,
    };

    const { data } = await borrowServices.getBorrows(params);
    return data;
  };

  const {
    data: dataBorrows,
    refetch: refetchBorrows,
    isLoading: isLoadingBorrows,
  } = useQuery({
    queryKey: ["AdminPeminjaman"],
    queryFn: getBorrows,
  });

  return {
    dataBorrows,
    isLoadingBorrows,
    refetchBorrows,
  };
};

export default useDashboardRecentActivity;
