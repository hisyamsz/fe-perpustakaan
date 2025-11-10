import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";

const RegisterSuccess = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <div className="z-100 flex flex-col items-center justify-center gap-10">
        <Image
          src="/images/general/logo-smkn-6.png"
          alt="success"
          width={250}
          height={250}
          loading="eager"
        />
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <h2 className="text-primary text-3xl font-bold">
            Berhasil Buat Akun
          </h2>
          <p className="text-default-500 text-xl font-bold">
            Cek email untuk verifikasi akun anda
          </p>
          <Button
            className="border-primary text-primary mt-4 w-fit"
            variant="bordered"
            type="button"
            onPress={() => router.push("/")}
          >
            Kembali ke beranda
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterSuccess;
