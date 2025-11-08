import PageHead from "@/components/commons/PageHead";
import * as React from "react";
import LandingPageLayoutNavbar from "./LandingPageLayoutNavbar";
import LandingPageLayoutFooter from "./LandingPageLayoutFooter";

interface LandingPageLayoutProps {
  children: React.ReactNode;
  title: string;
}

const LandingPageLayout: React.FC<LandingPageLayoutProps> = ({
  title,
  children,
}) => {
  return (
    <>
      <PageHead title={title} />
      <div className="mx-auto max-w-screen-2xl">
        <LandingPageLayoutNavbar />
        {children}
        <LandingPageLayoutFooter />
      </div>
    </>
  );
};

export default LandingPageLayout;
