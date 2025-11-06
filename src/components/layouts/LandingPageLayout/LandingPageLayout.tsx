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
      <LandingPageLayoutNavbar />
      <div className="mx-auto max-w-screen-2xl p-4 py-10 md:p-6 2xl:container">
        {children}
      </div>
      <LandingPageLayoutFooter />
    </>
  );
};

export default LandingPageLayout;
