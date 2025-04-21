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

type Props = {
  accessToken: boolean;
};

const Navbar = ({ accessToken }: Props) => {
  const router = useRouter();

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
                  className={
                    accessToken
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer hover:text-blue-500"
                  }
                  disabled={accessToken}
                >
                  Views
                </MenubarTrigger>
                <MenubarContent>
                  <Link href="/auth/login">
                    <MenubarItem className="cursor-pointer hover:text-blue-500">
                      Login as Admin
                    </MenubarItem>
                  </Link>
                  <MenubarSeparator />
                  <Link href="/auth/register">
                    <MenubarItem className="cursor-pointer hover:text-blue-500">
                      Register as Player
                    </MenubarItem>
                  </Link>
                  <MenubarSeparator />
                  <Link href="/home">
                    <MenubarItem className="cursor-pointer hover:text-blue-500">
                      {" "}
                      Home
                    </MenubarItem>
                  </Link>
                  <MenubarSeparator />
                  <Link href="/players">
                    <MenubarItem className="cursor-pointer hover:text-blue-500">
                      Players
                    </MenubarItem>
                  </Link>
                  <MenubarSeparator />
                  <Link href="/teams">
                    <MenubarItem className="cursor-pointer hover:text-blue-500">
                      Teams
                    </MenubarItem>
                  </Link>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger
                  className={
                    !accessToken
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer hover:text-blue-500"
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
