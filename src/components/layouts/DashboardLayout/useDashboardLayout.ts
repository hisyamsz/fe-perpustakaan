import authServices from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";

const useDashboardLayout = () => {
  const getProfile = async () => {
    try {
      const { data } = await authServices.getProfile();
      return data.data;
    } catch {
      return null;
    }
  };

  const { data: dataProfile, refetch: refetchProfile } = useQuery({
    queryKey: ["Profile"],
    queryFn: getProfile,
  });

  return { dataProfile, refetchProfile };
};

export default useDashboardLayout;
