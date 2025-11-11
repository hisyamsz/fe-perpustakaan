import {
  Button,
  Card,
  CardBody,
  Input,
  Spinner,
  Checkbox,
} from "@heroui/react";
import Image from "next/image";
import * as React from "react";
import { cn } from "@/utils/cn";
import { Controller } from "react-hook-form";
import useResetPassword from "./useResetPassword";

const ResetPassword: React.FC = () => {
  const {
    control,
    handleSubmit,
    errors,
    handleResetPassword,
    isPendingResetPassword,
    isVisible,
    toggleVisible,
  } = useResetPassword();

  return (
    <Card className="mx-auto max-w-md shadow-2xl">
      <CardBody className="p-8 text-black">
        <div className="mb-6 flex flex-col items-center justify-center gap-2">
          <Image
            src="/images/general/logo-smkn-6.png"
            alt="logo png"
            width={48}
            height={48}
            loading="lazy"
            className="h-12 w-12"
          />
          <h2 className="text-primary text-center text-2xl font-semibold">
            Ganti Password
          </h2>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit(handleResetPassword)}
          className={cn(
            "flex w-80 flex-col",
            Object.keys(errors).length > 0 ? "gap-2" : "gap-4",
          )}
        >
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Input
                {...field}
                label="Password Baru"
                type={isVisible ? "text" : "password"}
                variant="bordered"
                placeholder="Masukkan Password Baru Anda"
                isRequired
                isReadOnly={isPendingResetPassword}
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <Input
                {...field}
                label="Konfirmasi Password"
                type="password"
                variant="bordered"
                placeholder="Masukkan Konfirmasi Password Anda"
                isRequired
                isReadOnly={isPendingResetPassword}
                isInvalid={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword?.message}
              />
            )}
          />

          <Checkbox
            isSelected={isVisible}
            onValueChange={toggleVisible}
            size="sm"
            disableAnimation
          >
            Show Password
          </Checkbox>

          <Button
            type="submit"
            color="primary"
            fullWidth
            isLoading={isPendingResetPassword}
            spinner={<Spinner size="sm" color="white" />}
          >
            {!isPendingResetPassword && "Simpan Password"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default ResetPassword;
