import PageHead from "@/components/commons/PageHead";
import { FC, Fragment, ReactNode, useState } from "react";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import { SIDEBAR_ADMIN, SIDEBAR_USER } from "./DashboardLayout.constants";
import { Navbar, NavbarMenuToggle } from "@heroui/react";
import DashboardLayoutNavbar from "./DashboardLayoutNavbar";

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
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Fragment>
      <PageHead title={title} />
      <DashboardLayoutNavbar />
      <div className="mx-auto flex max-w-screen-2xl 2xl:container">
        <DashboardLayoutSidebar
          sidebarItems={type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_USER}
          isOpen={open}
        />
        <div className="h-screen w-full overflow-y-auto p-8">
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
    </Fragment>
  );
};

export default DashboardLayout;
