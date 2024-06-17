/** @format */
"use client";

import { useState, useEffect } from "react";
import { Nav } from "./ui/nav";

type Props = {};

import {
  ShoppingCart,
  LayoutDashboard,
  Users,
  ChevronRight
} from "lucide-react";
import { Button } from "./ui/button";
import { getLocalStorage} from "../lib/local-storage";
import { useWindowWidth } from "@react-hook/window-size";

export default function SideNavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  useEffect(() => {
    setHasMounted(true);
    // const storedValue = getLocalStorage("isLoggedIn", true);
    // console.log("storedValue:", storedValue);
    // setIsLoggedIn(storedValue);
  }, []);

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  if (!hasMounted) {
    // Prevent rendering until component has mounted
    return null;
  }

  return (
    <div
      className={`relative ${
        mobileWidth ? "" : "min-w-[80px]"
      } border-r px-3 pb-10 pt-24 bg-green-800 min-h-screen`}
    >
      {!mobileWidth && (
        <Button
          onClick={toggleSidebar}
          variant="secondary"
          className="rounded-full p-2"
        >
          <ChevronRight />
        </Button>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Players",
            href: "/players",
            icon: Users,
            variant: "ghost",
          },
          {
            title: "Teams",
            href: "/teams",
            icon: ShoppingCart,
            variant: "ghost",
          }
        ]}
      />
    </div>
  );
}
