"use client";
import PageTitle from "@/components/PageTitle";
import AddTeam from "@/components/AddTeam";
import { useState, useEffect } from "react";
import { PlayersList } from "../server-actions/players-actions";
import TeamsTable from "@/components/TeamsTable";
export type Team = {
  id: string;
  name: string;
};

import Navbar from "@/components/Navbar";

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const getListofPlayers = async () => {
      const players = await PlayersList();
      setTeams(players);
    };

    getListofPlayers();
  }, []);
  return (
    <>
      <PageTitle title="Teams" />
      <div className="flex items-center justify-between py-4">
        <div></div>
        <AddTeam />
      </div>
      <TeamsTable teams={teams} />
    </>
  );
}
