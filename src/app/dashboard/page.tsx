"use client";

import { useState, useEffect } from "react";
import PageTitle from "@/components/PageTitle";
import { Users, Activity } from "lucide-react";
import Card, { CardContent } from "@/components/Card";
import TeamsTable from "@/components/teams/teams-table";
import SalesCard from "@/components/SalesCard";
import { TeamsList } from "../server-actions/teams-actions";
import { PlayersList } from "../server-actions/players-actions";

import { Team } from "../teams/page";
import { Player } from "../players/page";

export default function Home() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [soldPlayers, setSoldPlayers] = useState<Player[]>([]);
  const [unSoldPlayers, setUnSoldPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const getListofPlayers = async () => {
      const fetchedPlayers = await PlayersList();
      setSoldPlayers(
        fetchedPlayers.filter(
          (player: { status: string }) => player.status !== "UNSOLD"
        )
      );
      setUnSoldPlayers(
        fetchedPlayers.filter(
          (player: { status: string }) => player.status !== "SOLD"
        )
      );
    };

    getListofPlayers();
  }, []);

  useEffect(() => {
    const fetchTeams = async () => {
      const fetchedTeams = await TeamsList();
      const updatedTeams = fetchedTeams.filter(
        (team: Team) => team.name !== "Default Team"
      );
      setTeams(updatedTeams);
    };

    fetchTeams();
  }, []);

  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Dashboard" />

      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        <Card label="Total Teams" amount={teams.length} icon={Users} />
        <Card
          label="Total Players Registered"
          amount={soldPlayers.length + unSoldPlayers.length}
          icon={Users}
        />
        <Card
          label="Players Sold"
          amount={soldPlayers.length}
          icon={Activity}
        />
        <Card
          label="Players Unsold"
          amount={unSoldPlayers.length}
          icon={Activity}
        />
      </section>
      <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">
        <div className=" overflow-auto space-y-8">
          <CardContent>
            <TeamsTable teams={teams} component="Dashboard" />
          </CardContent>
        </div>
        <div className="overflow-auto space-y-8">
          <CardContent className="flex justify-between gap-4">
            <section>
              <p>Recent Sales</p>
              <p className="text-sm text-gray-400">
                Players Sold to different teams.
              </p>
            </section>

            {soldPlayers.map((player) => (
              <SalesCard
                key={player.id}
                email={player.email}
                name={player.name}
                teamName={player.team.name}
              />
            ))}
          </CardContent>
        </div>
      </section>
    </div>
  );
}
