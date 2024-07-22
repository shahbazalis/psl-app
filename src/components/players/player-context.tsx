import { createContext, useState, useContext } from "react";
import { Player } from "./players-table";

type PlayerContextType = {
  selectedPlayer: Player | null;
  setSelectedPlayer: (player: Player | null) => void;
};

export const PlayerContext = createContext<PlayerContextType | undefined>(
  undefined
);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  return (
    <PlayerContext.Provider value={{ selectedPlayer, setSelectedPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayerContext must be used within a PlayerProvider");
  }
  return context;
};
