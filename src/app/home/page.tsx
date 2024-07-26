"use client";

import { useState, useEffect } from "react";
import PageTitle from "@/components/PageTitle";
import { TeamsList } from "../server-actions/teams-actions";
import { Team } from "../teams/page";
import LoadingComponent from "@/components/loader";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function Home() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
      <Image
        //className="w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem] bg-cover bg-center"
        //className="w-full h-48 sm:h-64 md:h-72 lg:h-[24rem] xl:h-[28rem] object-cover"
        //className="h-1/3 object-cover"
        src="/images/banner.png"
        alt="banner"
        layout="responsive"
        width={1280}
        height={720}
      />

      <section className="grid w-full grid-cols-1 gap-4 mt-4 mb-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-auto">
        {teams.map((team) => (
          <div key={team.id} className="overflow-auto">
            <Card onClick={() => router.push("/teams")}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Image
                    className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg mr-4 sm:mr-6 md:mr-8"
                    src={`/teams/${team.name.replace(/\s+/g, "-")}.jpg`}
                    alt={team.name}
                    width={128}
                    height={128}
                  />
                  <span className="text-black align-items justify-center text-sm sm:text-base md:text-lg lg:text-xl">
                    {team.name}
                  </span>
                </CardTitle>
                <CardDescription className="flex align-items justify-center"></CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </div>
        ))}
      </section>
    </div>
  );
}
