import { FC, JSX } from "react";
import { signOut } from "next-auth/react";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/router";
import { cn } from "@/utils/cn";
import { Button, Listbox, ListboxItem, Skeleton } from "@heroui/react";
import { FiUser } from "react-icons/fi";
import { IProfile } from "@/types/Auth";
import Link from "next/link";

interface SidebarItems {
  key: string;
  label: string;
  href: string;
  icon: JSX.Element;
}

interface DashboardLayoutSidebarProps {
  sidebarItems: SidebarItems[];
  isOpen: boolean;
  dataProfile?: IProfile;
}

const DashboardLayoutSidebar: FC<DashboardLayoutSidebarProps> = ({
  sidebarItems,
  isOpen,
  dataProfile,
}) => {
  const router = useRouter();

  return (
    <aside
      className={cn(
        "fixed inset-0 z-50 flex h-screen w-full max-w-[300px] -translate-x-full flex-col bg-gray-700 text-white transition-all duration-300 lg:relative lg:translate-x-0",
        { "translate-x-0": isOpen },
      )}
    >
      <div className="grid grid-cols-[48px_1fr] items-center gap-4 p-6">
        <FiUser className="h-12 w-12" />
        <div className="flex flex-col gap-2">
          <Skeleton isLoaded={!!dataProfile?.nama} className="rounded-md">
            <p className="line-clamp-2 font-medium">
              {dataProfile?.nama || "Memuat..."}
            </p>
          </Skeleton>
          <Skeleton isLoaded={!!dataProfile?.role} className="w-24 rounded-md">
            <p className="text-default-400 text-sm capitalize">
              {dataProfile?.role || "-"}
            </p>
          </Skeleton>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Listbox
          items={sidebarItems}
          variant="solid"
          aria-label="Dashboard Menu"
          className="px-2"
        >
          {(item) => (
            <ListboxItem
              key={item.key}
              startContent={item.icon}
              as={Link}
              href={item.href}
              className={cn("my-1 h-12 text-2xl transition-all duration-300", {
                "bg-primary text-white": router.pathname.startsWith(item.href),
              })}
            >
              {item.label}
            </ListboxItem>
          )}
        </Listbox>
        <div className="flex items-center border-t border-gray-600 bg-gray-700 p-4">
          <Button
            fullWidth
            variant="solid"
            size="lg"
            color="danger"
            className="flex justify-start rounded-lg px-2 py-1.5 text-white"
            onPress={() => signOut()}
          >
            <CiLogout />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default DashboardLayoutSidebar;
