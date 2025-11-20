import borrowServices from "@/services/borrow.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailPengembalian = () => {
  const { query, isReady } = useRouter();
  const id = query.id as string | undefined;

  const getDetailReturn = async () => {
    const { data } = await borrowServices.getDetailReturnById(id!);
    return data.data;
  };

  const {
    data: dataDetailReturn,
    isPending: isPendingDetailReturn,
    isError: isErrorDetailReturn,
  } = useQuery({
    queryKey: ["DetailPengembalian", id],
    queryFn: getDetailReturn,
    enabled: isReady && !!id,
  });

  return {
    dataDetailReturn,
    isPendingDetailReturn,
    isErrorDetailReturn,
  };
};

export default useDetailPengembalian;
