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
import useLogin from "./useLogin";
import { cn } from "@/utils/cn";
import { Controller } from "react-hook-form";

interface LoginProps {
  propName?: string;
}

const Login: React.FC<LoginProps> = () => {
  const {
    isVisible,
    toggleVisible,
    control,
    handleSubmit,
    errors,
    handleLogin,
    isPendingLogin,
  } = useLogin();

  return (
    <Card className="shadow-2xl">
      <CardBody className="flex items-center justify-center p-8">
        <div className="mb-4 flex flex-col items-center gap-2 text-center">
          <Link href="/">
            <Image
              src="/images/general/logo-smkn-6.png"
              alt="logo png"
              width={76}
              height={76}
              className="h-12 w-12"
            />
          </Link>
          <h2 className="text-primary text-2xl font-semibold">Login</h2>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit(handleLogin)}
          className={cn(
            "flex w-80 flex-col",
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
                placeholder="Masukkan email anda"
                isRequired
                isReadOnly={isPendingLogin}
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
                placeholder="Masukkan password anda"
                isRequired
                isReadOnly={isPendingLogin}
                isInvalid={errors.password !== undefined}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <div className="flex w-full items-center justify-between text-sm">
            <Checkbox
              isSelected={isVisible}
              onValueChange={toggleVisible}
              size="sm"
              disableAnimation
            >
              Show Password
            </Checkbox>
            <Link
              href="/auth/forgotPassword"
              className="text-danger-400 hover:text-danger-500 inline-block hover:underline"
            >
              Lupa password?
            </Link>
          </div>

          <Button
            type="submit"
            color="primary"
            fullWidth
            isLoading={isPendingLogin}
            spinner={<Spinner size="sm" color="white" />}
          >
            {!isPendingLogin && "Login"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-700">
          Belum punya akun?{" "}
          <Link
            href={"/auth/register"}
            className="text-primary-400 font-semibold hover:underline"
          >
            Daftar di sini
          </Link>
        </p>
      </CardBody>
    </Card>
  );
};

export default Login;
