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
} from "@heroui/react";
import Image from "next/image";
import * as React from "react";
import { NAVBAR_ITEMS } from "../LandingPageLayout.constant";
import { useRouter } from "next/router";
import { cn } from "@/utils/cn";

interface LandingPageLayoutNavbarProps {
  propName?: string;
}

const LandingPageLayoutNavbar: React.FC<LandingPageLayoutNavbarProps> = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  return (
    <Navbar
      maxWidth="full"
      position="static"
      isBordered
      isBlurred
      shouldHideOnScroll
      onMenuOpenChange={setIsMenuOpen}
      className="bg-linear-to-r from-sky-900 to-sky-700 py-4 text-white lg:px-8 lg:py-6"
    >
      <div className="flex items-center gap-4">
        <NavbarBrand as={Link} href="/">
          <Image
            src={"/images/general/logo-smkn-6.png"}
            alt="logo"
            width={100}
            height={100}
            className="hidden h-12 w-12 cursor-pointer md:block"
          />
        </NavbarBrand>
        <div className="">
          <h2 className="text-sm font-bold lg:text-xl">
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
              "rounded-lg px-2 py-1 text-sm text-white transition-all duration-150 hover:bg-white hover:text-sky-800",
              { "bg-white text-sky-800": router.pathname === item.href },
            )}
          >
            {item.label}
          </NavbarItem>
        ))}
        <Button
          size="sm"
          className="bg-white text-sky-800"
          as={Link}
          href="/auth/login"
        >
          Login
        </Button>
      </NavbarContent>
      <NavbarContent className="relative lg:hidden" justify="end">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
        <NavbarMenu className="absolute top-0 z-50 w-3/4 max-w-[280px] gap-4 pt-8">
          <div className="flex items-center gap-4">
            <Image
              src={"/images/general/logo-smkn-6.png"}
              alt="logo"
              width={100}
              height={100}
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
          <Button fullWidth color="primary" as={Link} href="/auth/login">
            Login
          </Button>
        </NavbarMenu>
      </NavbarContent>
    </Navbar>
  );
};

export default LandingPageLayoutNavbar;
