import authServices from "@/services/auth.service";
import { IProfile } from "@/types/Auth";
import { ApiAxiosError } from "@/types/Axios";
import { addToast } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useProfile = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const getProfile = async () => {
    const { data } = await authServices.getProfile();
    return data.data;
  };

  const { data: dataProfile, refetch: refetchProfile } = useQuery({
    queryKey: ["Profile"],
    queryFn: getProfile,
    enabled: router.isReady,
  });

  const updateProfile = async (payload: IProfile) => {
    const cleanedPayload = {
      ...payload,
      nama: payload?.nama?.trim(),
    };

    const { data } = await authServices.updateProfile(cleanedPayload);
    return data.data;
  };

  const {
    mutate: mutateUpdateProfile,
    isPending: isPendingUpdateProfile,
    isSuccess: isSuccessUpdateProfile,
  } = useMutation({
    mutationFn: (payload: IProfile) => updateProfile(payload),
    onError: (error: ApiAxiosError) => {
      addToast({
        title: "Gagal memperbarui profil",
        description:
          error?.response?.data?.errors ||
          error?.response?.data?.message ||
          "Terjadi kesalahan saat mengupdate profil.",
        color: "danger",
      });
    },
    onSuccess: () => {
      refetchProfile();
      queryClient.invalidateQueries({ queryKey: ["Profile"] });
      addToast({
        title: "Profil diperbarui",
        description: "Data profil kamu berhasil diperbarui.",
        color: "success",
      });
    },
  });

  const handleUpdateProfile = (data: IProfile) =>
    mutateUpdateProfile({ nama: data.nama });

  return {
    dataProfile,
    isPendingUpdateProfile,
    isSuccessUpdateProfile,
    handleUpdateProfile,
  };
};

export default useProfile;
