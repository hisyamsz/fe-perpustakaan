import { Button, Card, CardBody, Input, Spinner, Link } from "@heroui/react";
import Image from "next/image";
import * as React from "react";
import { cn } from "@/utils/cn";
import { Controller } from "react-hook-form";
import useForgotPassword from "./useForgotPassword";

const ForgotPassword: React.FC = () => {
  const {
    control,
    handleSubmit,
    errors,
    handleForgotPassword,
    isPendingForgotPassword,
  } = useForgotPassword();

  return (
    <Card className="mx-auto max-w-md shadow-2xl">
      <CardBody className="p-8 text-black">
        <div className="mb-4 flex flex-col items-center justify-center gap-2">
          <Image
            src="/images/general/logo-smkn-6.png"
            alt="logo png"
            width={48}
            height={48}
            loading="lazy"
            className="h-12 w-12"
          />
          <h2 className="text-primary text-center text-2xl font-semibold">
            Lupa Password
          </h2>
          <p className="text-center text-sm text-gray-600">
            Masukkan alamat email Anda dan kami akan mengirimkan link untuk
            mengatur ulang password.
          </p>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit(handleForgotPassword)}
          className={cn(
            "flex w-full flex-col",
            Object.keys(errors).length > 0 ? "gap-2" : "gap-4",
          )}
        >
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                {...field}
                label="Email"
                type="email"
                variant="bordered"
                placeholder="Masukkan email Anda"
                isRequired
                isReadOnly={isPendingForgotPassword}
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Button
            type="submit"
            color="primary"
            fullWidth
            isLoading={isPendingForgotPassword}
            spinner={<Spinner size="sm" color="white" />}
          >
            {!isPendingForgotPassword && "Kirim Link Reset"}
          </Button>

          <div className="mt-2 text-center text-sm">
            <span className="text-gray-600">Kembali ke </span>
            <Link
              href="/auth/login"
              color="primary"
              underline="always"
              className="text-sm"
            >
              Halaman Login
            </Link>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default ForgotPassword;
