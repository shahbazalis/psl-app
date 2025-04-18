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
      <div className="w-full">
        <Image
          src="https://psl-s3-vercel-bucket.s3.us-east-2.amazonaws.com/banner.jpg"
          alt="Banner"
          width={1280}
          height={720}
          className="w-full h-auto max-h-[250px] sm:max-h-[320px] md:max-h-[400px]"
          priority
        />
      </div>
      <section className="grid w-full grid-cols-1 gap-4 mt-4 mb-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {teams.map((team) => (
          <div key={team.id} className="overflow-auto">
            <Card
              className="cursor-pointer hover:bg-blue-500 hover:text-white"
              onClick={() => router.push("/teams")}
            >
              <CardHeader>
                <CardTitle className="flex flex-col items-center text-center space-y-2">
                  <Image
                    className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-4 border-white shadow-lg"
                    src={`https://psl-s3-vercel-bucket.s3.us-east-2.amazonaws.com/${team.name.replace(
                      /\s+/g,
                      ""
                    )}.jpg`}
                    alt={team.name}
                    width={128}
                    height={128}
                  />
                  <span className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold break-words max-w-[8rem] sm:max-w-[10rem] md:max-w-[12rem]">
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
