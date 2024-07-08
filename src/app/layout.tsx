"use client"

import type { Metadata } from "next";
import "./globals.css";
import { PlayerProvider } from "@/components/players/player-context";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PlayerProvider>{children}</PlayerProvider>
      </body>
    </html>
  );
}
