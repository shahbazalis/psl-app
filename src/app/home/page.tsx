"use client";

import { useState, useEffect } from "react";
import PageTitle from "@/components/PageTitle";
import { TeamsList } from "../server-actions/teams-actions";
import { Team } from "../teams/page";
import LoadingComponent from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      const fetchedTeams = await TeamsList();
      const updatedTeams = fetchedTeams.filter(
        (team: Team) => team.name !== "Default Team"
      );
      setTeams(updatedTeams);
      setLoading(false);
    };

    fetchTeams();
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className="w-full h-screen overflow-auto">
      <PageTitle title="Home" />

      <div
        className="w-full h-2/5 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/banner.jpg)" }}
      ></div>

      <section className="grid w-full grid-cols-1 gap-4 mt-4 lg:grid-cols-4 overflow-auto">
        {teams.map((team) => (
          <div key={team.id} className="space-y-8 overflow-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                <img className="w-24 h-24 rounded-full border-4 border-white shadow-lg mr-8"/>
                <span className="text-black align-items justify-center">{team.name}</span>
                </CardTitle>
                <CardDescription className="flex align-items justify-center">
                
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </div>
        ))}
      </section>
    </div>
  );
}