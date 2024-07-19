"use client";

import "./globals.css";
import { useState, useEffect } from "react";
import { PlayerProvider } from "@/components/players/player-context";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    // Prevent rendering until component has mounted
    return null;
  }

  return (
    <html lang="en">
      <body>
        <PlayerProvider>{children}</PlayerProvider>
        <Toaster />
      </body>
    </html>
  );
}
