"use client";

import { useState, useEffect } from "react";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";
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
import { TeamsList, GetTeam } from "@/app/server-actions/teams-actions";
import { Team } from "@/app/teams/page";
import { useRouter } from "next/navigation";
import { AlertDialogComponent } from "../alert-dialog";
import { motion } from "framer-motion";
import LoadingComponent from "@/components/loader";

export default function PlayerDetail() {
  const [bidValue, setBidValue] = useState(0);
  const [teamBudget, setTeamBudget] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [disableSoldBtn, setDisableSoldBtn] = useState(false);
  const [teamId, setTeamId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

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
      try {
        const playerDetails = await getCookie("player");
        setSelectedPlayer(JSON.parse(playerDetails));
        const fetchedTeams = await TeamsList();
        setTeams(
          fetchedTeams.filter((team: Team) => team.name !== "Default Team")
        );
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      } finally {
        setLoading(false); // Stop loading once fetched
      }
    };

    getPlayerData();
  }, []);

  const handleFormSubmit = async (
    data: z.infer<typeof BidPlayerSchema>,
    action: string
  ) => {
    const [id, name] = data.team.split("|");
    const biddingTeam = await GetTeam(id);
    if (action === "bid") {
      if (biddingTeam.budget >= data.value) {
        setSelectedRadio(name);
        setBidValue(data.value);
        setIsSubmitted(true);
        setDisableSoldBtn(false);
        setErrorMessage(""); // Clear any previous error message
      } else {
        setErrorMessage(
          "Team budget is less than bid value, so the team cannot buy the player."
        );
        setDisableSoldBtn(true);
      }
    } else if (action === "sold") {
      const remainingBudget = biddingTeam.budget - bidValue;
      setTeamId(biddingTeam.id);
      setTeamBudget(remainingBudget);
      setShowDialog(true);
    }
  };

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const handleSoldConfirmation = async () => {
    if (selectedPlayer) {
      const [id] = form.getValues("team").split("|");
      const price = form.getValues("value");
      await UpdatePlayer(selectedPlayer.id, "SOLD", id, price);
    }
    setShowDialog(false); // Close the dialog after confirmation
    router.push("/players");
  };
  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <Card className="w-full max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
      <CardHeader className="flex justify-between items-center">
        <div>
          <CardTitle className="text-xl font-bold dark:text-white">
            Player Details
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400 ">
            Teams can see the player details here and make the bid.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 rounded-md border p-4">
          {selectedPlayer && (
            <Image
              className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 border-white shadow-lg sm:mr-8"
              src={selectedPlayer.url}
              alt={selectedPlayer.name}
              unoptimized={true}
              width={96}
              height={96}
            />
          )}
          <div className="flex-1 space-y-1 text-center sm:text-left">
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
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bid Value</FormLabel>
                    <FormControl>
                      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-60">
                        <Input
                          {...field}
                          placeholder="Enter The Amount"
                          className="w-full md:w-1/5"
                          onChange={(e) => {
                            field.onChange(e);
                            form.setValue(
                              "value",
                              parseFloat(e.target.value) || 0
                            );
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="team"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Select Team</FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={(value: any) => {
                            field.onChange(value);
                          }}
                          className="grid grid-cols-2 md:grid-cols-3 gap-4"
                        >
                          {teams &&
                            teams.map((team, index) => {
                              return (
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  key={index}
                                >
                                  <RadioGroupItem
                                    value={`${team.id}|${team.name}`}
                                    id={`r${index}`}
                                  />
                                  <Label
                                    htmlFor={`r${index}`}
                                    className="dark:text-white"
                                  >
                                    {team.name}
                                  </Label>
                                </motion.div>
                              );
                            })}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              {errorMessage && (
                <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
              )}
              <input type="hidden" {...form.register("action")} />
              <div className="flex justify-between">
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
                  onClick={() => form.setValue("action", "bid")}
                >
                  Bid for Player
                </Button>
                <Button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2"
                  onClick={() => form.setValue("action", "sold")}
                  disabled={bidValue <= 0 || disableSoldBtn}
                >
                  Player Sold
                </Button>
              </div>
            </form>
          </Form>
          {bidValue > 0 && selectedRadio && (
            <motion.div
              className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-lg font-semibold dark:text-white">
                {selectedRadio} placed a bid of{" "}
                <span className="text-green-600 dark:text-green-400">
                  ${bidValue}
                </span>{" "}
                for {selectedPlayer && selectedPlayer.name}
              </p>
            </motion.div>
          )}
          <div>
            <AlertDialogComponent
              showDialog={showDialog}
              onClose={handleDialogClose}
              title="Are you absolutely sure?"
              description="This action cannot be undone. This will mark the player as sold and update the records."
              handleConfirmation={handleSoldConfirmation}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
