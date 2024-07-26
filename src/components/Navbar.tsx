"use client";

import MaxWidthWrapper from "./MaxWidthWrapper";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { deleteCookies, getCookie } from "@/lib/cookies";
import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

const Navbar = () => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState(false);
  useEffect(() => {
    const fetchAccessToken = async () => {
      const accessToken = await getCookie("accessToken");
      if (accessToken) setAccessToken(true);
    };

    fetchAccessToken();
  }, []);
  const handleRemove = async () => {
    await deleteCookies(["accessToken", "admin", "player", "teams"]);
    router.push("/auth/login");
  };
  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all bg-slate-200">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between space-x-4">
          <div className="flex z-40 font-semibold">
            PSL<span className="text-green-500">Tampere</span>
          </div>
          <div className="flex-grow flex justify-end">
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger
                  className={accessToken ? "opacity-50 cursor-not-allowed" : ""}
                  disabled={accessToken}
                >
                  Views
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    <Link href="/auth/login">Login as Admin</Link>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <Link href="/auth/register">Register as Player</Link>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <Link href="/home">Home</Link>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <Link href="/players">Players</Link>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <Link href="/teams">Teams</Link>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger
                  className={
                    !accessToken ? "opacity-50 cursor-not-allowed" : ""
                  }
                  disabled={!accessToken}
                  onClick={handleRemove}
                >
                  Logout
                </MenubarTrigger>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
