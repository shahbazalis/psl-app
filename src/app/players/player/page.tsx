"use client";

import { useState, useEffect } from "react";
import PlayerDetail from "@/components/players/player-details";
import LoadingComponent from "@/components/loader";

export default function PlayerInfo() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <>
      <PlayerDetail />
    </>
  );
}
