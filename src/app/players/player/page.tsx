"use client";

import PageTitle from "@/components/PageTitle";
import { useState, useEffect, Suspense, useMemo } from "react";

export default function Admins() {
  //const [admins, setAdmins] = useState<Player[]>([]);

  //   useEffect(() => {
  //     const getListofPlayers = async () => {
  //       const players = await AdminsList();
  //       setAdmins(players);
  //     };

  //     getListofPlayers();
  //   }, []);

  //   const memoizedAdminsTable = useMemo(
  //     () => <AdminsTable admins={admins} />,
  //     [admins]
  //   );

  return (
    <>
      <PageTitle title="Player Details" />
      <h1>Player Component</h1>
      {/* <Navbar />
      <PageTitle title="Admins" />
      <Suspense fallback={<p>Loading Admins...</p>}>
        {memoizedAdminsTable}
      </Suspense> */}
    </>
  );
}
