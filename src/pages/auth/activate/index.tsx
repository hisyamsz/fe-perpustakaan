import AuthLayout from "@/components/layouts/AuthLayout";
import Activate from "@/components/views/Auth/Activate";
import authServices from "@/services/auth.service";
import { FC } from "react";

interface ActivatePageProps {
  status: "success" | "failed";
}

const ActivatePage: FC<ActivatePageProps> = ({ status }) => {
  return (
    <AuthLayout title="Aktivasi Akun">
      <Activate status={status} />
    </AuthLayout>
  );
};

export async function getServerSideProps(context: { query: { code: string } }) {
  try {
    const result = await authServices.activate({ code: context.query.code });

    if (result.data.status === "success") {
      return {
        props: {
          status: "success",
        },
      };
    } else {
      return {
        props: {
          status: "failed",
        },
      };
    }
  } catch {
    return {
      props: {
        status: "failed",
      },
    };
  }
}

export default ActivatePage;
