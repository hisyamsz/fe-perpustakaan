import PageHead from "@/components/commons/PageHead";
import * as React from "react";
import LandingPageLayoutNavbar from "./LandingPageLayoutNavbar";
import LandingPageLayoutFooter from "./LandingPageLayoutFooter";

interface LandingPageLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const LandingPageLayout: React.FC<LandingPageLayoutProps> = ({
  title,
  children,
  description,
}) => {
  return (
    <>
      <PageHead title={title} description={description} />
      <div className="mx-auto max-w-500">
        <LandingPageLayoutNavbar />
        <div className="min-h-screen bg-slate-100">{children}</div>
        <LandingPageLayoutFooter />
      </div>
    </>
  );
};

export default LandingPageLayout;
