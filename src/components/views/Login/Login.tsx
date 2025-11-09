import { Button, Card, CardBody, Checkbox, Input } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import useLogin from "./useLogin";
import { cn } from "@/utils/cn";

interface LoginProps {
  propName?: string;
}

const Login: React.FC<LoginProps> = () => {
  const { isVisible, toggleVisible } = useLogin();

  return (
    <Card className="shadow-2xl">
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
            Login
          </h2>
        </div>

        <form
          className={cn(
            "flex w-80 flex-col",
            Object.keys({}).length > 0 ? "gap-2" : "gap-4",
          )}
        >
          <Input
            label="Email"
            type="email"
            variant="bordered"
            className="text-black"
            placeholder="Masukkan Email Anda"
          />
          <Input
            label="Password"
            type="password"
            variant="bordered"
            className="text-black"
            placeholder="Masukkan password"
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
              href="/auth/forget-password"
              className="text-danger-400 hover:text-danger-500 inline-block hover:underline"
            >
              Lupa password?
            </Link>
          </div>

          <Button color="primary" fullWidth>
            Masuk
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-700">
          Don&apos;t have any account?{" "}
          <Link
            href={"/auth/register"}
            className="text-primary-400 font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>
      </CardBody>
    </Card>
  );
};

export default Login;
