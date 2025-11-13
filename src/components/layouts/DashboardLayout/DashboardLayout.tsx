import PageHead from "@/components/commons/PageHead";
import { FC, Fragment, ReactNode, useEffect, useState } from "react";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import { SIDEBAR_ADMIN, SIDEBAR_USER } from "./DashboardLayout.constants";
import { Navbar, NavbarMenuToggle } from "@heroui/react";
import DashboardLayoutNavbar from "./DashboardLayoutNavbar";
import useDashboardLayout from "./useDashboardLayout";
import { useRouter } from "next/router";

interface DashboardLayoutProps {
  children: ReactNode;
  description?: string;
  title?: string;
  type?: "user" | "admin";
}

const DashboardLayout: FC<DashboardLayoutProps> = ({
  children,
  description,
  title,
  type = "admin",
}) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const { dataProfile, refetchProfile } = useDashboardLayout();

  useEffect(() => {
    if (router.isReady) {
      refetchProfile();
    }
  }, [router.isReady, refetchProfile]);

  return (
    <Fragment>
      <PageHead title={title} />
      <div className="mx-auto max-w-500">
        <DashboardLayoutNavbar />
        <div className="flex">
          <DashboardLayoutSidebar
            sidebarItems={type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_USER}
            isOpen={open}
            dataProfile={dataProfile}
          />
          <div className="h-screen w-full px-6 py-4 lg:h-full lg:px-8 lg:py-6">
            <Navbar
              className="flex justify-between bg-transparent px-0"
              isBlurred={false}
              position="static"
              classNames={{ wrapper: "p-0" }}
              onMenuOpenChange={setOpen}
            >
              <h1 className="text-3xl font-bold">{title}</h1>
              <NavbarMenuToggle
                aria-label={open ? "Close menu" : "Open menu"}
                className="lg:hidden"
              />
            </Navbar>
            <p className="text-small mb-4">{description}</p>
            {children}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardLayout;
