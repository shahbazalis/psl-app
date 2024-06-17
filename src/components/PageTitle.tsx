/** @format */
"use client";
import { cn } from "@/lib/utils";


type Props = {
  title: string;
  className?: string;
};
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";

export default function PageTitle({ title, className }: Props) {
  return (
    <div>
      <h1 className={cn("text-2xl font-semibold", className)}>{title}</h1>
    </div>
  );
}
