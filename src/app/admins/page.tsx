"use client";

import PageTitle from "@/components/PageTitle";
import { useState, useEffect, Suspense, useMemo } from "react";
import { AdminsList } from "../server-actions/admins-actions";

import Navbar from "@/components/Navbar";

import { Player } from "../players/page";
import AdminsTable from "@/components/admins/AdminsTable";

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
      <Navbar />
      <PageTitle title="Admins" />
      <Suspense fallback={<p>Loading Admins...</p>}>
        {memoizedAdminsTable}
      </Suspense>
    </>
  );
}
