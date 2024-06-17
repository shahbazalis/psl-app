import PageTitle from "@/components/PageTitle";
import DataTable from "@/components/DataTable";

export type Player = {
  name: string;
  role: string;
  status?: "pending" | "processing" | "success" | "failed";
  nationality: string;
};

const playersData: Player[] = [
  {
    name: "Adil",
    role: "Bowler",
    nationality: "Pakistan",
  },
  {
    name: "Chandu",
    role: "Bowler",
    nationality: "Pakistan",
  },
  {
    name: "Basharat",
    role: "Batter",
    nationality: "Pakistan",
  },
  {
    name: "Chawala",
    role: "Bowler",
    nationality: "Pakistan",
  },
  {
    name: "Daud",
    role: "All-Rounder",
    nationality: "Pakistan",
  },
  {
    name: "Ehsan",
    role: "Batter",
    nationality: "Pakistan",
  },
  {
    name: "Farooq",
    role: "Bowler",
    nationality: "Pakistan",
  },
  {
    name: "Ghulam",
    role: "All-Rounder",
    nationality: "Pakistan",
  },
  {
    name: "Hadi",
    role: "Bowler",
    nationality: "Pakistan",
  },
  {
    name: "Ijlal",
    role: "Batter",
    nationality: "Pakistan",
  },
  {
    name: "Jalil",
    role: "Bowler",
    nationality: "Pakistan",
  },
  {
    name: "Kashif",
    role: "Bowler",
    nationality: "Pakistan",
  },
  {
    name: "Luqman",
    role: "Batter",
    nationality: "Pakistan",
  },
  {
    name: "Masood",
    role: "Batter",
    nationality: "Pakistan",
  },
];

import Navbar from "@/components/Navbar";

export default function Players() {
  return (
    <>
      <Navbar />
      <PageTitle title="Players" />
      <DataTable />
    </>
  );
}
