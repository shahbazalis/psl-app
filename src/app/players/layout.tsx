import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "../../lib/utils";
import SideNavbar from "@/components/SideNavbar";
import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PSL-Players",
  description:
    "Players feature created to get and add the information about players.",
};

export default function PlayersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const accessToken = cookies().get("accessToken")?.value ?? null;
  return (
    <section
      className={cn(
        "min-h-screen w-full bg-white text-black flex ",
        inter.className
      )}
    >
      <SideNavbar />
      <div className="flex flex-col w-full">
      <Navbar accessToken={!!accessToken}/>
        <div className="p-8 w-full">{children}</div>
      </div>
    </section>
  );
}
