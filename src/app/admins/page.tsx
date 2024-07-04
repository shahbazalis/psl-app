"use client";

import PageTitle from "@/components/PageTitle";
import { useState, useEffect, Suspense, useMemo } from "react";
import { AdminsList } from "../server-actions/admins-actions";

import { Player } from "../players/page";
import AdminsTable from "@/components/admins/admins-table";

export default function Admins() {
  const [admins, setAdmins] = useState<Player[]>([]);

  useEffect(() => {
    const getListofPlayers = async () => {
      const players = await AdminsList();
      setAdmins(players);
    };

    getListofPlayers();
  }, []);

  const memoizedAdminsTable = useMemo(
    () => <AdminsTable admins={admins} />,
    [admins]
  );

  return (
    <>
      <PageTitle title="Admins" />
      <Suspense fallback={<p>Loading Admins...</p>}>
        {memoizedAdminsTable}
      </Suspense>
    </>
  );
}
