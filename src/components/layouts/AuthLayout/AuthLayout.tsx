import PageHead from "@/components/commons/PageHead";
import * as React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, children }) => {
  return (
    <div className="bg-auth relative flex min-h-screen min-w-full flex-col items-center justify-center gap-10 bg-cover bg-center py-10 backdrop-blur-2xl lg:py-0">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-xs"></div>
      <PageHead title={title} />
      <section className="flex max-w-screen-2xl items-center justify-center">
        {children}
      </section>
    </div>
  );
};

export default AuthLayout;
