import { FC } from "react";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import useDetailPengembalian from "./useDetailPengembalian";
import DetailPengembalianCard from "./DetailPengembalianCard";

const DetailPengembalian: FC = () => {
  const { dataDetailReturn, isPendingDetailReturn, isErrorDetailReturn } =
    useDetailPengembalian();

  return (
    <div className="mt-6 space-y-4">
      <Breadcrumbs>
        <BreadcrumbItem>Peminjaman</BreadcrumbItem>
        <BreadcrumbItem>Detail</BreadcrumbItem>
      </Breadcrumbs>
      <DetailPengembalianCard
        dataDetailReturn={dataDetailReturn}
        isPendingDetailReturn={isPendingDetailReturn}
        isErrorDetailReturn={isErrorDetailReturn}
      />
    </div>
  );
};

export default DetailPengembalian;
