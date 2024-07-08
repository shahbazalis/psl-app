import React from "react";
import { CircleUser } from "lucide-react";

export type SalesProps = {
  name: string;
  email: string;
  teamName: string;
};

export default function SalesCard(props: SalesProps) {
  return (
    <div className="  flex flex-wrap justify-between gap-3 pr-6">
      <section className="flex justify-between gap-3 ">
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 p-1">
        <CircleUser size={24} />
        </div>
        <div className="text-sm">
          <p>{props.name}</p>
          <div className="text-ellipsis overflow-hidden whitespace-nowrap w-[120px]  sm:w-auto  text-gray-400">
            {props.email}
          </div>
        </div>
      </section>
      <p>{props.teamName}</p>
    </div>
  );
}
