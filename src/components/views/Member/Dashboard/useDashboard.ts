import borrowServices from "@/services/borrow.service";
import { IBorrowItem } from "@/types/Borrow";
import { toISODateString } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { Summary } from "./Dashboard.constants";

const useDashboard = () => {
  const getBorrowUser = async () => {
    const params = {
      size: 100,
      page: 1,
    };

    const { data } = await borrowServices.getBorrowUser(params);
    return data.data || [];
  };

  const { data: borrowData = [], isPending: isPendingSummary } = useQuery({
    queryKey: ["UserSummary"],
    queryFn: getBorrowUser,
  });

  const today = new Date().toISOString().split("T")[0];

  const totalBorrow = borrowData.length;

  const pendingBorrow = borrowData.filter(
    (item: IBorrowItem) => item.status?.toLowerCase() === "diproses",
  ).length;

  const currentlyBorrowed = borrowData?.filter(
    (item: IBorrowItem) => item.status?.toLowerCase() === "dipinjam",
  ).length;

  const dueToday = borrowData?.filter((item: IBorrowItem) => {
    const isoDate = toISODateString(item.tenggat_kembali);
    if (!isoDate) return false;

    const dueDate = isoDate.split("T")[0];
    return (
      item.status === "Dipinjam" && item.valid === true && dueDate === today
    );
  }).length;

  const overdue = borrowData?.filter((item: IBorrowItem) => {
    const isoDate = toISODateString(item.tenggat_kembali);
    if (!isoDate) return false;

    const dueDate = new Date(isoDate);
    const now = new Date();

    return item.status?.toLowerCase() === "dipinjam" && dueDate < now;
  }).length;

  const history = borrowData?.filter(
    (item: IBorrowItem) =>
      item.status === "Dikembalikan" && item.valid === true,
  ).length;

  const summary: Summary = {
    currentlyBorrowed,
    pendingBorrow,
    totalBorrow,
    dueToday,
    overdue,
    history,
  };

  return {
    summary,
    isPendingSummary,
    borrowData,
  };
};

export default useDashboard;
