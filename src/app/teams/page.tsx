"use client";
import PageTitle from "@/components/PageTitle";
import AddTeam from "@/components/admins/AddTeam";
import { useState, useEffect, Suspense, useMemo } from "react";
import { TeamsList, Team } from "@/app/server-actions/teams-actions";
import TeamsTable from "@/components/teams/TeamsTable";
export type Team = {
  id: string;
  name: string;
};

import Navbar from "@/components/Navbar";

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const fetchedTeams = await TeamsList();
      if (fetchedTeams.message !== "Unauthorized") {
        const updatedTeams = fetchedTeams.filter(
          (team: Team) => team.name !== "Default Team"
        );
        setTeams(updatedTeams);
      }
    };

    fetchTeams();
  }, []);

  const addNewTeam = (newTeam: Team) => {
    setTeams((prevTeams) => [...prevTeams, newTeam]);
  };

  const memoizedTeamsTable = useMemo(
    () => <TeamsTable teams={teams} />,
    [teams]
  );

  return (
    <>
      <PageTitle title="Teams" />
      <div className="flex items-center justify-between py-4">
        <div></div>
        <AddTeam addNewTeam={addNewTeam} />
      </div>
      <Suspense fallback={<p>Loading Teams...</p>}>
        {memoizedTeamsTable}
      </Suspense>
    </>
  );
}
