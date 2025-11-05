import { cn } from "@/utils/cn";
import { Inter } from "next/font/google";
import { FC, ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface AppShellProps {
  children: ReactNode;
}

const AppShell: FC<AppShellProps> = ({ children }) => {
  return <main className={cn(inter.className)}>{children}</main>;
};

export default AppShell;
