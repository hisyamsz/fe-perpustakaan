import { FC, JSX } from "react";
import { signOut } from "next-auth/react";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/router";
import { cn } from "@/utils/cn";
import { Button, Listbox, ListboxItem, Skeleton } from "@heroui/react";
import { FiUser } from "react-icons/fi";
import { TypeProfile } from "@/types/Auth";

interface SidebarItems {
  key: string;
  label: string;
  href: string;
  icon: JSX.Element;
}

interface DashboardLayoutSidebarProps {
  sidebarItems: SidebarItems[];
  isOpen: boolean;
  dataProfile?: TypeProfile;
}

const DashboardLayoutSidebar: FC<DashboardLayoutSidebarProps> = ({
  sidebarItems,
  isOpen,
  dataProfile,
}) => {
  const router = useRouter();

  return (
    <div
      className={cn(
        "fixed top-0 bottom-0 z-50 flex h-screen w-full max-w-[300px] -translate-x-full flex-col justify-between bg-gray-700 px-4 py-6 text-white transition-all lg:relative lg:translate-x-0",
        { "translate-x-0": isOpen },
      )}
    >
      <div>
        <div className="flex justify-center">
          <div className="mb-6 flex w-full items-center justify-start gap-4 px-4">
            <FiUser className="h-12 w-12" />
            <div className="flex flex-col gap-2">
              <Skeleton isLoaded={!!dataProfile?.nama} className="rounded-md">
                <p className="font-medium">
                  {dataProfile?.nama || "Memuat..."}
                </p>
              </Skeleton>

              <Skeleton
                isLoaded={!!dataProfile?.role}
                className="w-24 rounded-md"
              >
                <p className="text-default-400 text-sm capitalize">
                  {dataProfile?.role || "-"}
                </p>
              </Skeleton>
            </div>
          </div>
        </div>
        <Listbox
          items={sidebarItems}
          variant="solid"
          aria-label="Dashboard Menu"
          className="px-0"
        >
          {(item) => (
            <ListboxItem
              key={item.key}
              textValue={item.label}
              startContent={item.icon}
              onPress={() => router.push(item.href)}
              className={cn("my-1 h-12 text-2xl transition-all duration-300", {
                "bg-primary text-white": router.pathname.startsWith(item.href),
              })}
            >
              {item.label}
            </ListboxItem>
          )}
        </Listbox>
      </div>
      <div className="flex items-center p-1">
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
  );
};

export default DashboardLayoutSidebar;
