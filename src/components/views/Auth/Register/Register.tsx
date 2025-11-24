import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Input,
  Spinner,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { Controller } from "react-hook-form";
import useRegister from "./useRegister";
import { cn } from "@/utils/cn";

const Register: React.FC = () => {
  const {
    isVisible,
    toggleVisible,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  } = useRegister();

  return (
    <Card className="shadow-2xl">
      <CardBody className="p-8 text-black">
        <div className="mb-4 flex flex-col items-center justify-center gap-2">
          <Link href="/">
            <Image
              src="/images/general/logo-smkn-6.png"
              alt="logo png"
              width={76}
              height={76}
              className="h-12 w-12"
            />
          </Link>
          <h2 className="text-primary text-center text-2xl font-semibold">
            Register
          </h2>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit(handleRegister)}
          className={cn(
            "flex w-80 flex-col",
            Object.keys(errors).length > 0 ? "gap-2" : "gap-4",
          )}
        >
          <Controller
            name="nama"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                label="Nama"
                placeholder="Masukkan nama anda"
                variant="bordered"
                autoComplete="off"
                isRequired
                isReadOnly={isPendingRegister}
                isInvalid={errors.nama !== undefined}
                errorMessage={errors.nama?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                {...field}
                label="Email"
                type="email"
                variant="bordered"
                className="text-black"
                placeholder="Masukkan email anda"
                isRequired
                isReadOnly={isPendingRegister}
                isInvalid={errors.email !== undefined}
                errorMessage={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Input
                {...field}
                label="Password"
                type={isVisible ? "text" : "password"}
                variant="bordered"
                className="text-black"
                placeholder="Masukkan password anda"
                isRequired
                isInvalid={errors.password !== undefined}
                errorMessage={errors.password?.message}
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
            isLoading={isPendingRegister}
            spinner={<Spinner size="sm" color="white" />}
          >
            {!isPendingRegister && "Daftar"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-700">
          Sudah punya akun?{" "}
          <Link
            href={"/auth/login"}
            className="text-primary-400 font-semibold hover:underline"
          >
            Login di sini
          </Link>
        </p>
      </CardBody>
    </Card>
  );
};

export default Register;
