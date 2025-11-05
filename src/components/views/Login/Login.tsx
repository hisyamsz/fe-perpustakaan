import { Button, Card, CardBody, Input } from "@heroui/react";
import Image from "next/image";
import * as React from "react";

interface LoginProps {
  propName?: string;
}

const Login: React.FC<LoginProps> = () => {
  return (
    <Card className="shadow-2xl">
      <CardBody className="flex flex-col items-center justify-center gap-4 p-8 text-black">
        <Image
          src="/images/general/logo-smkn-6.png"
          alt="logo png"
          width={300}
          height={300}
          loading="lazy"
          className="h-12 w-12"
        />
        <h2 className="text-primary text-center text-2xl font-semibold">
          Login
        </h2>

        <form className="flex w-80 flex-col gap-6">
          <Input
            label="NIP"
            variant="bordered"
            className="text-black"
            placeholder="Masukkan NIP Anda"
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
      </CardBody>
    </Card>
  );
};

export default Login;
