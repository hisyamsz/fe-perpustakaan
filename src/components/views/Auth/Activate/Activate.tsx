import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";

interface ActivateProps {
  status: "success" | "failed";
}

const Activate: FC<ActivateProps> = ({ status }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <div className="z-100 flex flex-col items-center justify-center gap-10">
        <Image
          src="/images/general/logo-smkn-6.png"
          alt="success"
          width={200}
          height={200}
          loading="eager"
          className="h-auto w-64 object-cover"
        />
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <h2 className="text-primary text-3xl font-bold">
            {status === "success"
              ? "Berhasil Aktivasi Akun"
              : "Gagal Aktivasi Akun"}
          </h2>
          <p className="text-default-500 text-xl font-bold">
            {status === "success" ? "Lanjutkan untuk login" : "Code is Invalid"}
          </p>
          <Button
            className="mt-4"
            variant="bordered"
            color="primary"
            type="button"
            onPress={() =>
              router.push(status === "success" ? "/auth/login" : "/")
            }
          >
            {status === "success" ? "Lanjut untuk login" : "Kembali ke beranda"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Activate;
