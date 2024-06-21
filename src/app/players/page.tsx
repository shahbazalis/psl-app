"use client";

import PageTitle from "@/components/PageTitle";
import PlayersTable from "@/components/PlayersTable";
import { useState, useEffect } from "react";
import { PlayersList, DeletePlayer} from "../server-actions/players-actions";

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


  return (
    <>
      <Navbar />
      <PageTitle title="Players" />
      <PlayersTable players={players} />
    </>
  );
}
