// /** @format */
// "use client";

// import { useState, useEffect } from "react";
// import { Nav } from "./ui/nav";

// type Props = {};

// import { LayoutDashboard, Users, ChevronRight, HomeIcon } from "lucide-react";
// import { Button } from "./ui/button";
// import { useWindowWidth } from "@react-hook/window-size";
// import { getCookie } from "@/lib/cookies";

// export default function SideNavbar({}: Props) {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [hasMounted, setHasMounted] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);

//   const onlyWidth = useWindowWidth();
//   const mobileWidth = onlyWidth < 768;

//   useEffect(() => {
//     const fetchAdminStatus = async () => {
//       let fetchAdminStatus = await getCookie("admin");
//       if (fetchAdminStatus) {
//         let admin = JSON.parse(fetchAdminStatus);
//         setIsAdmin(admin);
//       }
//     };

//     fetchAdminStatus();
//     setHasMounted(true);
//   }, []);

//   function toggleSidebar() {
//     setIsCollapsed(!isCollapsed);
//   }

//   if (!hasMounted) {
//     // Prevent rendering until component has mounted
//     return null;
//   }

//   const links = [
//     {
//       title: "Home",
//       href: "/home",
//       icon: HomeIcon,
//       variant: "default" as "default",
//     },
//     {
//       title: "Players",
//       href: "/players",
//       icon: Users,
//       variant: "ghost" as "ghost",
//     },
//     {
//       title: "Teams",
//       href: "/teams",
//       icon: Users,
//       variant: "ghost" as "ghost",
//     },
//   ];

//   if (isAdmin) {
//     links.splice(1, 0, {
//       title: "Dashboard",
//       href: "/dashboard",
//       icon: LayoutDashboard,
//       variant: "ghost" as "ghost",
//     });
//     links.splice(2, 0, {
//       title: "Admins",
//       href: "/admins",
//       icon: Users,
//       variant: "ghost" as "ghost",
//     });
//   }

//   return (
//     <div
//       className={`relative ${
//         mobileWidth ? "" : "min-w-[80px]"
//       } border-r px-3 pb-10 pt-24 bg-green-700 min-h-screen`}
//     >
//       {!mobileWidth && (
//         <Button
//           onClick={toggleSidebar}
//           variant="secondary"
//           className="rounded-full p-2"
//         >
//           <ChevronRight />
//         </Button>
//       )}
//       <Nav isCollapsed={mobileWidth ? true : isCollapsed} links={links} />
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { Nav } from "./ui/nav";

import {
  LayoutDashboard,
  Users,
  ChevronRight,
  HomeIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { useWindowWidth } from "@react-hook/window-size";
import { getCookie } from "@/lib/cookies";

export default function SideNavbar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null); // null means "not loaded yet"

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const fetchAdminStatus = await getCookie("admin");
        if (fetchAdminStatus) {
          const admin = JSON.parse(fetchAdminStatus);
          setIsAdmin(admin);
        } else {
          setIsAdmin(false); // explicitly set if not found
        }
      } catch (err) {
        setIsAdmin(false); // fallback
      } finally {
        setHasMounted(true);
      }
    };

    fetchAdminStatus();
  }, []);

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  if (!hasMounted || isAdmin === null) {
    // Prevent rendering until component has mounted and admin status is known
    return null;
  }

  const links = [
    {
      title: "Home",
      href: "/home",
      icon: HomeIcon,
      variant: "default" as const,
    },
    {
      title: "Players",
      href: "/players",
      icon: Users,
      variant: "ghost" as const,
    },
    {
      title: "Teams",
      href: "/teams",
      icon: Users,
      variant: "ghost" as const,
    },
  ];

  if (isAdmin) {
    links.splice(1, 0, {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      variant: "ghost" as const,
    });
    links.splice(2, 0, {
      title: "Admins",
      href: "/admins",
      icon: Users,
      variant: "ghost" as const,
    });
  }

  return (
    <div
      className={`relative ${
        mobileWidth ? "" : "min-w-[80px]"
      } border-r px-3 pb-10 pt-24 bg-green-700 min-h-screen`}
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
      <Nav isCollapsed={mobileWidth ? true : isCollapsed} links={links} />
    </div>
  );
}
