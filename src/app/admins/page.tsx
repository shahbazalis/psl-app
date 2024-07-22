"use client";

import PageTitle from "@/components/PageTitle";
import { useState, useEffect, Suspense, useMemo } from "react";
import { AdminsList } from "../server-actions/admins-actions";

import { Player } from "@/components/players/players-table";
import AdminsTable from "@/components/admins/admins-table";
import LoadingComponent from "@/components/loader";

export default function Admins() {
  const [admins, setAdmins] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getListofAdmins = async () => {
      const admins = await AdminsList();
      if (admins.statusCode !== 500) {
        setAdmins(admins);
      } else console.log("error:", admins.message);
      setLoading(false);
    };

    getListofAdmins();
  }, []);

  const memoizedAdminsTable = useMemo(
    () => <AdminsTable admins={admins} />,
    [admins]
  );
  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <PageTitle title="Admins" />
      <Suspense fallback={<p>Loading Admins...</p>}>
        {memoizedAdminsTable}
      </Suspense>
    </>
  );
}
