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
import { Badge } from "@/components/ui/badge";

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
        src="/images/banner.png"
        alt="banner"
        layout="responsive"
        width={1280}
        height={720}
      />
      <section className="grid w-full grid-cols-1 gap-4 mt-4 mb-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {teams.map((team) => (
          <div key={team.id} className="overflow-auto">
            <Card
              className="cursor-pointer hover:bg-blue-500 hover:text-white"
              // onClick={() => router.push("/teams")}
            >
              <CardHeader>
                <CardTitle className="flex ">
                  <Image
                    className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg mr-4 sm:mr-6 md:mr-8"
                    src={`https://psl-s3-vercel-bucket.s3.us-east-2.amazonaws.com/${team.name.replace(
                      /\s+/g,
                      ""
                    )}.jpg`}
                    alt={team.name}
                    width={128}
                    height={128}
                  />
                  <span className="flex items-center justify-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl break-words leading-tight text-center">
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
