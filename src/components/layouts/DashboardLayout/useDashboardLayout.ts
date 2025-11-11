import authServices from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDashboardLayout = () => {
  const router = useRouter();

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
    enabled: router.isReady,
  });

  return { dataProfile, refetchProfile };
};

export default useDashboardLayout;
