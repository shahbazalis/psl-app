/** @format */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "../../lib/utils";
import SideNavbar from "@/components/SideNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PSL-Teams",
  description: "Teams feature created to get and add the information about teams."
};

export default function TeamsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
       <body
        className={cn(
          "min-h-screen w-full bg-white text-black flex ",
          inter.className
        )}
      >
        <SideNavbar />
        <div className="p-8 w-full ">{children}</div>
      </body>
    </html>
  );
}
