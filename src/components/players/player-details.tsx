"use client";

import { useState, useEffect } from "react";
import { CircleUserRound } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { BidPlayerSchema } from "@/schema";
import { Player } from "./players-table";
import { getCookie } from "@/lib/cookies";
import { UpdatePlayer } from "@/app/server-actions/players-actions";
import { TeamsList } from "@/app/server-actions/teams-actions";
import { Team } from "@/app/teams/page";
import { useRouter } from "next/navigation";
import { AlertDialogComponent } from "../alert-dialog";

export default function PlayerDetail() {
  const [bidValue, setBidValue] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState<Player| null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(BidPlayerSchema),
    defaultValues: {
      value: 0,
      team: "",
      action: "",
    },
  });

  useEffect(() => {
    const getPlayerData = async () => {
      const playerDetails = await getCookie("player");
      setSelectedPlayer(JSON.parse(playerDetails));
      const fetchedTeams = await TeamsList();
      setTeams(
        fetchedTeams.filter((team: Team) => team.name !== "Default Team")
      );
    };

    getPlayerData();
  }, []);

  const handleFormSubmit = async (
    data: z.infer<typeof BidPlayerSchema>,
    action: string
  ) => {
    const [id, name] = data.team.split("|");
    if (action === "bid") {
      setSelectedRadio(name);
      setBidValue(data.value);
      setIsSubmitted(true);
    } else if (action === "sold") {
      setShowDialog(true);
    }
  };

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const handleSoldConfirmation = async () => {
    if (selectedPlayer) {
      const [id] = form.getValues("team").split("|");
      const price = form.getValues('value');
      await UpdatePlayer(selectedPlayer.id, "SOLD", id, price);
      router.push("/players");
    }
    setShowDialog(false); // Close the dialog after confirmation
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Player Details</CardTitle>
        <CardDescription>
          Teams can see the player details here and make the bid.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <CircleUserRound className="h-24 w-24" />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
            {selectedPlayer && selectedPlayer.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {selectedPlayer && selectedPlayer.role}
            </p>
          </div>
        </div>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) =>
                handleFormSubmit(data, form.getValues("action"))
              )}
              className="space-y-6"
            >
              <div className="space-y-4 ">
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bid Value</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-60">
                          <Input
                            {...field}
                            placeholder="Enter The Amount"
                            className="w-1/5"
                            onChange={(e) => {
                              field.onChange(e);
                              form.setValue(
                                "value",
                                parseInt(e.target.value, 10) || 0
                              );
                            }}
                          />
                          {isSubmitted &&
                            form.watch("value") > 0 &&
                            form.watch("team") && (
                              <p className="text-lg font-semibold leading-none mt-4">
                                {selectedRadio} made a bid of {bidValue} for{" "}
                                {selectedPlayer && selectedPlayer.name}
                              </p>
                            )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="team"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={(value: any) => {
                            field.onChange(value);
                          }}
                        >
                          {teams.map((team, index) => {
                            return (
                              <div
                                key={index}
                                className="flex items-center space-x-2"
                              >
                                <RadioGroupItem
                                  value={`${team.id}|${team.name}`}
                                  id={`r${index}`}
                                />
                                <Label htmlFor={`r${index}`}>{team.name}</Label>
                              </div>
                            );
                          })}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <input type="hidden" {...form.register("action")} />
              <div className="flex justify-between">
                <Button
                  type="submit"
                  className="bg-sky-600"
                  onClick={() => form.setValue("action", "bid")}
                >
                  Bid for Player
                </Button>
                <Button
                  type="submit"
                  className="bg-red-600"
                  onClick={() => form.setValue("action", "sold")}
                >
                  Player Sold
                </Button>
              </div>
            </form>
          </Form>
          <div>
            <AlertDialogComponent
              showDialog={showDialog}
              onClose={handleDialogClose}
              title="Are you absolutely sure?"
              description=" This action cannot be undone. This will mark the player as
                    sold and update the records."
              handleConfirmation={handleSoldConfirmation}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
