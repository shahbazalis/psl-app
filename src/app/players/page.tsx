"use client";

import PageTitle from "@/components/PageTitle";
import PlayersTable from "@/components/players/PlayersTable";
import { useState, useEffect, Suspense, useMemo } from "react";
import { PlayersList } from "../server-actions/players-actions";

import Navbar from "@/components/Navbar";

export type Player = {
  teamId: string;
  id: string;
  name: string;
  email: string;
  role: string;
  phoneNumber: string;
  nationality: string;
  status: "SOLD" | "UNSOLD";
  team: { name: string };
  password?: string;
  cconfirmPassword?: string;
};

export default function Players() {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const getListofPlayers = async () => {
      const players = await PlayersList();
      setPlayers(players);
    };

    getListofPlayers();
  }, []);

  const memoizedPlayersTable = useMemo(
    () => <PlayersTable players={players} />,
    [players]
  );

  return (
    <>
      <PageTitle title="Players" />
      <Suspense fallback={<p>Loading Players...</p>}>
        {memoizedPlayersTable}
      </Suspense>
    </>
  );
}
