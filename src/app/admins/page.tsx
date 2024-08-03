"use client";

import PageTitle from "@/components/PageTitle";
import { useState, useEffect, Suspense, useMemo } from "react";
import { AdminsList } from "../server-actions/admins-actions";
import { useRouter } from "next/navigation";
import { Player } from "@/components/players/players-table";
import AdminsTable from "@/components/admins/admins-table";
import LoadingComponent from "@/components/loader";
import { deleteCookies } from "@/lib/cookies";
import { AlertDialogComponent } from "@/components/alert-dialog";

export default function Admins() {
  const [admins, setAdmins] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const getListofAdmins = async () => {
      const admins = await AdminsList();
      if (admins.statusCode !== 500) {
        setAdmins(admins);
      }
      if (admins.statusCode === 401) {
        await deleteCookies(["accessToken", "admin", "player", "teams"]);
        setShowDialog(true);
      } else console.log("error:", admins.message);
      setLoading(false);
    };

    getListofAdmins();
  }, [router]);

  const memoizedAdminsTable = useMemo(
    () => <AdminsTable admins={admins} />,
    [admins]
  );

  const handleLoginConfirmation = async () => {
    router.push("/auth/login");
    setShowDialog(false);
  };

  const handleDialogClose = () => {
    router.push("/auth/login");
    setShowDialog(false);
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <PageTitle title="Admins" />
      {memoizedAdminsTable}
   
        <AlertDialogComponent
          showDialog={showDialog}
          onClose={handleDialogClose}
          title="Session Expired"
          description="Your session is expired please login again."
          handleConfirmation={handleLoginConfirmation}
        />
   
    </>
  );
}
