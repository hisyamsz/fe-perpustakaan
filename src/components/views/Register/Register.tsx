import { Button, Card, CardBody, Input } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

interface RegisterProps {
  propName?: string;
}

const Register: React.FC<RegisterProps> = () => {
  return (
    <Card className="shadow-2xl">
      <CardBody className="p-8 text-black">
        <div className="mb-4 flex flex-col items-center justify-center gap-2">
          <Image
            src="/images/general/logo-smkn-6.png"
            alt="logo png"
            width={300}
            height={300}
            loading="lazy"
            className="h-12 w-12"
          />
          <h2 className="text-primary text-center text-2xl font-semibold">
            Register
          </h2>
        </div>

        <form className="flex w-80 flex-col gap-4">
          <Input
            label="Username"
            variant="bordered"
            className="text-black"
            placeholder="Masukkan Username Anda"
          />
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

          <Button color="primary" fullWidth>
            Masuk
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-700">
          Have an account?{" "}
          <Link
            href={"/auth/login"}
            className="text-primary-400 font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </CardBody>
    </Card>
  );
};

export default Register;
