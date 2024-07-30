"use client";
import PageTitle from "@/components/PageTitle";
import AddTeam from "@/components/teams/add-team";
import { useState, useEffect, useMemo } from "react";
import { TeamsList } from "@/app/server-actions/teams-actions";
import TeamsTable from "@/components/teams/teams-table";
import { getCookie } from "@/lib/cookies";
import { TeamPlayers } from "@components/teams/team-players";
import { Player } from "@/components/players/players-table";
import LoadingComponent from "@/components/loader";
export type Team = {
  id: string;
  name: string;
  budget: number;
  players: Player[];
};

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTeams = await TeamsList();
        if (fetchedTeams.message !== "Unauthorized") {
          const updatedTeams = fetchedTeams.filter(
            (team: Team) => team.name !== "Default Team"
          );
          setTeams(updatedTeams);
          setLoading(false);
          if (updatedTeams.length > 0) {
            setSelectedTeam(updatedTeams[0]);
          }
        }

        let fetchAdminStatus = await getCookie("admin");
        if (fetchAdminStatus) {
          let admin = JSON.parse(fetchAdminStatus);
          setIsAdmin(admin);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();

  }, []);

  const addNewTeam = (newTeam: Team) => {
    setTeams((prevTeams) => [...prevTeams, newTeam]);
  };

  const memoizedTeamsTable = useMemo(
    () => (
      <TeamsTable
        teams={teams}
        setTeams={setTeams}
        selectedTeam={selectedTeam}
        setSelectedTeam={setSelectedTeam}
        component="Teams"
      />
    ),
    [teams, selectedTeam]
  );

  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <>
      <PageTitle title="Teams" />
      <div className="flex items-center justify-between py-4">
        <div></div>
        {isAdmin && <AddTeam addNewTeam={addNewTeam} />}
      </div>
      <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-[40%_60%]">
        {memoizedTeamsTable}
        {selectedTeam && <TeamPlayers selectedTeam={selectedTeam} />}
      </section>
    </>
  );
}
