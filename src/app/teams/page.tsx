"use client";
import PageTitle from "@/components/PageTitle";
import AddTeam from "@/components/teams/add-team";
import { useState, useEffect, Suspense, useMemo } from "react";
import { TeamsList} from "@/app/server-actions/teams-actions";
import TeamsTable from "@/components/teams/teams-table";
import { getCookie } from "@/lib/cookies";
import {TeamPlayers} from "@components/teams/team-players"
import { Player } from "../players/page";
export type Team = {
  id: string;
  name: string;
  players : Player []
};

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      const fetchedTeams = await TeamsList();
      if (fetchedTeams.message !== "Unauthorized") {
        const updatedTeams = fetchedTeams.filter(
          (team: Team) => team.name !== "Default Team"
        );
        setTeams(updatedTeams);
        if (updatedTeams.length > 0) {
          setSelectedTeam(updatedTeams[0]);
        }
      }
    };
    fetchTeams();
  }, []);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      let fetchAdminStatus = await getCookie("admin");
      if (fetchAdminStatus) {
        let admin = JSON.parse(fetchAdminStatus);
        setIsAdmin(admin);
      }
    };

    fetchAdminStatus();
  }, []);

  const addNewTeam = (newTeam: Team) => {
    setTeams((prevTeams) => [...prevTeams, newTeam]);
  };

  const memoizedTeamsTable = useMemo(
    () => <TeamsTable teams={teams} 
    selectedTeam={selectedTeam}
    setSelectedTeam={setSelectedTeam}component="Teams" />,
    [teams, selectedTeam]
  );

  return (
    <>
      <PageTitle title="Teams" />
      <div className="flex items-center justify-between py-4">
        <div></div>
        {isAdmin && <AddTeam addNewTeam={addNewTeam} />}
      </div>
      <Suspense fallback={<p>Loading Teams...</p>}>
        <section className="grid grid-cols-1  gap-8 transition-all lg:grid-cols-2">
          {memoizedTeamsTable}
          {selectedTeam && <TeamPlayers selectedTeam={selectedTeam} />}
        </section>
      </Suspense>
    </>
  );
}
