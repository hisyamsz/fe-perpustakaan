import { Card, CardBody, Skeleton, Chip } from "@heroui/react";
import {
  FaBook,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaMoneyBillWave,
  FaClock,
  FaUser,
} from "react-icons/fa";
import { IDetailReturn } from "@/types/Borrow";
import { FC, Fragment } from "react";
import { convertTime } from "@/utils/date";
import { convertIDR } from "@/utils/currency";

interface DetailPengembalianCardProps {
  dataDetailReturn: IDetailReturn;
  isPendingDetailReturn: boolean;
  isErrorDetailReturn: boolean;
}

const DetailPengembalianCard: FC<DetailPengembalianCardProps> = ({
  dataDetailReturn,
  isPendingDetailReturn,
  isErrorDetailReturn,
}) => {
  return (
    <Fragment>
      {!isPendingDetailReturn && !isErrorDetailReturn && dataDetailReturn && (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card>
              <CardBody className="space-y-3 p-6">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <FaBook size={20} className="text-blue-600" /> Informasi Buku
                </h2>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-500">
                    Judul:
                  </span>
                  <span className="text-sm font-medium">
                    {dataDetailReturn.peminjaman.buku.judul}
                  </span>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="space-y-3 p-6">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <FaUser size={20} className="text-purple-600" /> Informasi
                  Peminjam
                </h2>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-600">
                    Nama:
                  </span>
                  <span className="text-sm font-medium">
                    {dataDetailReturn.peminjaman.user.nama}
                  </span>
                </div>
              </CardBody>
            </Card>
          </div>

          <Card>
            <CardBody className="space-y-3 p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                <FaCalendarAlt size={20} className="text-green-600" /> Informasi
                Tanggal
              </h2>

              <div className="ml-1 space-y-2">
                <p className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-600">
                    Tanggal Pinjam:
                  </span>
                  <span className="text-sm font-medium">
                    {convertTime(dataDetailReturn.peminjaman.tanggal_pinjam)}
                  </span>
                </p>

                <p className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-600">
                    Tanggal Tenggat:
                  </span>
                  <span className="text-sm font-medium">
                    {convertTime(dataDetailReturn.peminjaman.tenggat_kembali)}
                  </span>
                </p>

                <p className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-600">
                    Tanggal Dikembalikan:
                  </span>
                  <span className="text-sm font-medium">
                    {convertTime(dataDetailReturn.tanggal_dikembalikan)}
                  </span>
                </p>
              </div>
            </CardBody>
          </Card>

          <Card className="w-full">
            <CardBody className="space-y-4 p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                <FaExclamationTriangle size={20} className="text-yellow-500" />{" "}
                Status & Denda
              </h2>

              <div className="ml-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-600">
                    Status:
                  </span>
                  <Chip
                    size="sm"
                    color={
                      dataDetailReturn.peminjaman.status === "Dikembalikan"
                        ? "success"
                        : dataDetailReturn.peminjaman.status === "Terlambat"
                          ? "danger"
                          : "warning"
                    }
                    variant="flat"
                  >
                    {dataDetailReturn.peminjaman.status}
                  </Chip>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-600">
                    Status Buku:
                  </span>
                  <Chip
                    size="sm"
                    color={
                      dataDetailReturn.kondisi_buku === "Baik"
                        ? "success"
                        : dataDetailReturn.kondisi_buku === "Hilang"
                          ? "danger"
                          : "warning"
                    }
                    variant="flat"
                  >
                    {dataDetailReturn.kondisi_buku}
                  </Chip>
                </div>

                <div className="flex items-center gap-2">
                  <FaClock className="text-orange-500" />
                  <span className="text-sm font-semibold text-gray-600">
                    Hari Telat:
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      dataDetailReturn.hari_telat > 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {dataDetailReturn.hari_telat} hari
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <FaMoneyBillWave
                    className={`${
                      (dataDetailReturn.denda as number) > 0
                        ? "text-red-600"
                        : "text-emerald-600"
                    }`}
                  />
                  <span className="text-sm font-semibold text-gray-600">
                    Denda:
                  </span>
                  <span
                    className={`text-sm font-semibold ${
                      (dataDetailReturn.denda as number) > 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {convertIDR(dataDetailReturn.denda as number)}
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </>
      )}

      {isPendingDetailReturn && (
        <Fragment>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[1, 2].map((i) => (
              <Card key={i}>
                <CardBody className="space-y-3">
                  <Skeleton className="h-8 w-40 rounded-lg" />
                  <Skeleton className="h-6 w-full rounded-lg" />
                </CardBody>
              </Card>
            ))}
          </div>
          {[1, 2].map((i) => (
            <Card key={i} className="w-full">
              <CardBody className="space-y-3">
                <Skeleton className="h-8 w-40 rounded-lg" />
                <Skeleton className="h-6 w-full rounded-lg" />
                <Skeleton className="h-6 w-full rounded-lg" />
              </CardBody>
            </Card>
          ))}
        </Fragment>
      )}

      {isErrorDetailReturn && (
        <Card className="border border-red-300 bg-red-50">
          <CardBody className="py-10 text-center text-red-600">
            <p className="font-semibold">
              Terjadi kesalahan saat mengambil data.
            </p>
            <p className="text-sm">Silakan coba lagi.</p>
          </CardBody>
        </Card>
      )}

      {!isPendingDetailReturn && !isErrorDetailReturn && !dataDetailReturn && (
        <Card className="border border-gray-300 bg-gray-50">
          <CardBody className="py-10 text-center text-gray-600">
            <p className="font-semibold">Data tidak ditemukan.</p>
          </CardBody>
        </Card>
      )}
    </Fragment>
  );
};

export default DetailPengembalianCard;
