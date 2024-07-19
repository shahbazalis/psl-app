"use client";

import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { deleteCookies, getCookie } from "@/lib/cookies";
import Link from "next/link";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
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
        <div className="flex h-14 items-center justify-between">
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
                  View
                </MenubarTrigger>
                <MenubarContent>
                  <Link href="/players">
                    <MenubarItem
                      className={accessToken ? "pointer-events-none" : ""}
                    >
                      Players
                    </MenubarItem>
                  </Link>
                  <MenubarSeparator />
                  <Link href="/teams">
                    <MenubarItem
                      className={accessToken ? "pointer-events-none" : ""}
                    >
                      Teams
                    </MenubarItem>
                  </Link>
                  <MenubarSeparator />
                  <Link href="/auth/login">
                    <MenubarItem
                      className={accessToken ? "pointer-events-none" : ""}
                    >
                      Login as an Admin
                    </MenubarItem>
                  </Link>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger
                  className={
                    !accessToken ? "opacity-50 cursor-not-allowed" : ""
                  }
                  disabled={!accessToken}
                >
                  Profiles
                </MenubarTrigger>
                <MenubarContent>
                  {accessToken && (
                    <MenubarItem onClick={handleRemove} inset>
                      Logout
                    </MenubarItem>
                  )}
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
            {/* {accessToken ? (
              <Button
                onClick={handleRemove}
                className="rounded-full p-2 bg-green-700 text-white"
              >
                <LogOut />
              </Button>
            ) : (
              <div className="flex gap-x-4">
                <Link href="/players">
                  <Button className="bg-green-700 hover:bg-green-600 text-white">
                    Players
                  </Button>
                </Link>
                <Link href="/teams">
                  <Button className="bg-green-700 hover:bg-green-600 text-white">
                    Teams
                  </Button>
                </Link>
              </div>
            )} */}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
