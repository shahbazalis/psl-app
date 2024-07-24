"use client";

import MaxWidthWrapper from "./MaxWidthWrapper";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { deleteCookies, getCookie } from "@/lib/cookies";
import Link from "next/link";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

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
                <Link href="/auth/login">
                  <MenubarTrigger
                    className={
                      accessToken ? "opacity-50 cursor-not-allowed" : ""
                    }
                    disabled={accessToken}
                  >
                    Login as Admin
                  </MenubarTrigger>
                </Link>
              </MenubarMenu>
              <MenubarMenu>
                <Link href="/auth/register">
                  <MenubarTrigger
                    className={
                      accessToken ? "opacity-50 cursor-not-allowed" : ""
                    }
                    disabled={accessToken}
                  >
                    Register as Player
                  </MenubarTrigger>
                </Link>
              </MenubarMenu>
              <MenubarMenu>
                <Link href="/home">
                  <MenubarTrigger
                    className={
                      accessToken ? "opacity-50 cursor-not-allowed" : ""
                    }
                    disabled={accessToken}
                  >
                    Home
                  </MenubarTrigger>
                </Link>
              </MenubarMenu>
              <MenubarMenu>
                <Link href="/players">
                  <MenubarTrigger
                    className={
                      accessToken ? "opacity-50 cursor-not-allowed" : ""
                    }
                    disabled={accessToken}
                  >
                    Players
                  </MenubarTrigger>
                </Link>
              </MenubarMenu>
              <MenubarMenu>
                <Link href="/teams">
                  <MenubarTrigger
                    className={
                      accessToken ? "opacity-50 cursor-not-allowed" : ""
                    }
                    disabled={accessToken}
                  >
                    Teams
                  </MenubarTrigger>
                </Link>
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
