import {
  Navbar,
  NavbarBrand,
  Link,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
  Divider,
} from "@heroui/react";
import Image from "next/image";
import * as React from "react";
import { NAVBAR_ITEMS } from "../LandingPageLayout.constant";
import { useRouter } from "next/router";
import { cn } from "@/utils/cn";
import { signOut, useSession } from "next-auth/react";
import useLandingPageLayoutNavbar from "./useLandingPageLayoutNavbar";

const LandingPageLayoutNavbar: React.FC = () => {
  const router = useRouter();
  const { status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  const { dataProfile, refetchProfile } = useLandingPageLayoutNavbar();

  React.useEffect(() => {
    if (router.isReady || dataProfile) {
      refetchProfile();
    }
  }, [router.isReady, dataProfile, refetchProfile]);

  const isAuthenticated = status === "authenticated";
  const isUnauthenticated = status === "unauthenticated";
  const isLoadingSession = status === "loading";

  const dashboardHref =
    dataProfile && dataProfile.role === "user"
      ? "/member/dashboard"
      : "/admin/dashboard";

  return (
    <Navbar
      maxWidth="full"
      position="static"
      isBordered
      isBlurred
      disableAnimation
      onMenuOpenChange={setIsMenuOpen}
      className="bg-linear-to-r from-sky-900 to-sky-700 py-2 text-white lg:px-8 lg:py-6"
    >
      <div className="flex items-center gap-4">
        <NavbarBrand as={Link} href="/">
          <Image
            src={"/images/general/logo-smkn-6.png"}
            alt="logo"
            width={50}
            height={50}
            className="h-12 w-12 cursor-pointer lg:h-14 lg:w-14"
          />
        </NavbarBrand>
        <div className="hidden md:block">
          <h2 className="text-sm font-bold lg:text-xl 2xl:text-2xl">
            Perpustakaan SMKN 6 Kota Tangerang Selatan
          </h2>
          <p className="text-sm">Pusat Sumber Belajar & Literasi</p>
        </div>
      </div>
      <NavbarContent className="hidden lg:flex" justify="end">
        {NAVBAR_ITEMS.map((item) => (
          <NavbarItem
            key={`nav-${item.label}`}
            as={Link}
            href={item.href}
            title={item.label}
            className={cn(
              "rounded-lg px-2.5 py-1.5 text-white transition-all duration-150 hover:bg-white hover:text-sky-800",
              { "bg-white text-sky-800": router.pathname === item.href },
            )}
          >
            {item.label}
          </NavbarItem>
        ))}

        {isLoadingSession && (
          <Button
            className="bg-white font-medium text-sky-800"
            type="button"
            onPress={() => router.push("/auth/login")}
          >
            Login
          </Button>
        )}

        {isUnauthenticated && (
          <Button
            className="bg-white font-medium text-sky-800"
            type="button"
            onPress={() => router.push("/auth/login")}
          >
            Login
          </Button>
        )}

        {isAuthenticated && (
          <NavbarItem className="hidden lg:flex">
            <Dropdown>
              <DropdownTrigger>
                <Avatar
                  isBordered
                  showFallback
                  title={dataProfile?.email}
                  className="cursor-pointer transition-transform"
                />
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="dashboard" href={dashboardHref}>
                  Dashboard
                </DropdownItem>
                <DropdownItem key="profile" href="/member/profile">
                  Profile
                </DropdownItem>
                <DropdownItem
                  key="signOut"
                  onPress={() => signOut()}
                  color="danger"
                  className="text-danger"
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarContent className="relative lg:hidden" justify="end">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
        <NavbarMenu className="absolute top-0 z-50 h-screen w-3/4 max-w-[280px] gap-4 pt-8">
          <div className="flex items-center gap-4">
            <Image
              src={"/images/general/logo-smkn-6.png"}
              alt="logo"
              width={48}
              height={48}
              className="h-12 w-12 cursor-pointer"
            />
            <h2 className="text-primary-700 text-xl font-bold">Perpustakaan</h2>
          </div>
          {NAVBAR_ITEMS.map((item) => (
            <NavbarMenuItem key={`nav-${item.label}`}>
              <Link
                href={item.href}
                className={cn(
                  "text-default-700 hover:text-primary font-medium",
                  {
                    "text-primary-500 font-bold": router.pathname === item.href,
                  },
                )}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}

          {isLoadingSession && (
            <Button fullWidth color="primary" as={Link} href="/auth/login">
              Login
            </Button>
          )}

          {isUnauthenticated && (
            <Button fullWidth color="primary" as={Link} href="/auth/login">
              Login
            </Button>
          )}

          {isAuthenticated && (
            <>
              <Divider />
              <NavbarMenuItem>
                <Link
                  href={dashboardHref}
                  className="text-default-700 hover:text-primary font-medium"
                >
                  Dashboard
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link
                  href="/member/profile"
                  className="text-default-700 hover:text-primary font-medium"
                >
                  Profile
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Button onPress={() => signOut()} color="danger" fullWidth>
                  Log out
                </Button>
              </NavbarMenuItem>
            </>
          )}
        </NavbarMenu>
      </NavbarContent>
    </Navbar>
  );
};

export default LandingPageLayoutNavbar;
