"use client";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteAccessToken } from "@/lib/cookies";

const Navbar = () => {
  const router = useRouter();
  const handleRemove = () => {
    deleteAccessToken();
    router.push("/auth/login");
  };
  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            case<span className="text-green-600">cobra</span>
          </Link>

          <div className="h-full flex items-center space-x-4">
            <div className="relative flex justify-end ">
              <Button
                onClick={handleRemove}
                className=" rounded-full p-2 bg-orange-400"
              >
                <LogOut />
              </Button>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
