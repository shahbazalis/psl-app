"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

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
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Player } from "./players-table";
import { Team } from "@/app/teams/page";
import { BidPlayerSchema } from "@/schema";
import { TeamsList, GetTeam } from "@/app/server-actions/teams-actions";
import { UpdatePlayer } from "@/app/server-actions/players-actions";
import LoadingComponent from "@/components/loader";
import { AlertDialogComponent } from "../alert-dialog";

export type PlayerDetailDialogProps = {
  showPlayerDetail: boolean;
  onClose: () => void;
  player: Player | undefined;
};

interface FullscreenElementWithVendor extends HTMLElement {
  webkitRequestFullscreen?: () => void;
  msRequestFullscreen?: () => void;
}

export default function PlayerDetail({
  showPlayerDetail,
  onClose,
  player,
}: PlayerDetailDialogProps) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [bidValue, setBidValue] = useState(0);
  const [selectedRadio, setSelectedRadio] = useState("");
  const [disableSoldBtn, setDisableSoldBtn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const form = useForm({
    resolver: zodResolver(BidPlayerSchema),
    defaultValues: {
      value: 0,
      team: "",
      action: "",
    },
  });

  const openFullscreen = () => {
    const elem = containerRef.current as FullscreenElementWithVendor | null;

    if (elem) {
      // request fullscreen
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFull =
        document.fullscreenElement === containerRef.current ||
        (document as any).webkitFullscreenElement === containerRef.current ||
        (document as any).msFullscreenElement === containerRef.current;

      setIsFullscreen(isFull);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const fetchedTeams = await TeamsList();
        setTeams(
          fetchedTeams.filter(
            (team: { name: string }) => team.name !== "Default Team"
          )
        );
      } catch (err) {
        console.error("Failed to load teams:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
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
        setDisableSoldBtn(false);
        setErrorMessage("");
      } else {
        setErrorMessage("Team budget is less than bid value.");
        setDisableSoldBtn(true);
      }
    }

    if (action === "sold") {
      setShowDialog(true);
    }
  };

  const handleSoldConfirmation = async () => {
    if (!player) return;
    const [id] = form.getValues("team").split("|");
    const price = form.getValues("value");
    await UpdatePlayer(player.id, "SOLD", id, price);
    setShowDialog(false);
    onClose();
    router.push("/teams");
  };

  if (loading) return <LoadingComponent />;

  return (
    <Dialog
      open={showPlayerDetail}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
          setBidValue(0);
          setSelectedRadio("");
          setDisableSoldBtn(false);
          setErrorMessage("");
          form.reset();
        }
      }}
    >
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Player Details</DialogTitle>
          <DialogDescription>
            Teams can view and bid on this player.
          </DialogDescription>
        </DialogHeader>

        <Card className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-4">
          <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
            {player && (
              <div
                ref={containerRef}
                onClick={openFullscreen}
                className={`cursor-pointer border-4 border-white shadow-lg overflow-hidden ${
                  isFullscreen
                    ? "fixed inset-0 z-50 bg-black flex items-center justify-center"
                    : "w-32 h-32 rounded-full relative"
                }`}
              >
                {isFullscreen ? (
                  <Image
                    src={player.url}
                    alt={player.name}
                    fill
                    unoptimized
                    className="object-contain"
                  />
                ) : (
                  <Image
                    src={player.url}
                    alt={player.name}
                    width={128}
                    height={128}
                    unoptimized
                    className="object-cover"
                  />
                )}
              </div>
            )}
            <div className="text-center sm:text-left">
              <CardTitle className="text-lg dark:text-white">
                {player?.name}
              </CardTitle>
              <CardDescription className="text-sm dark:text-gray-300">
                {player?.role}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
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
                        <Input
                          {...field}
                          placeholder="Enter amount"
                          onChange={(e) => {
                            const value = parseFloat(e.target.value) || 0;
                            field.onChange(e);
                            form.setValue("value", value);
                          }}
                          className="max-w-xs"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="team"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Team</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="grid grid-cols-2 md:grid-cols-3 gap-3"
                        >
                          {teams.map((team, i) => (
                            <motion.div
                              key={team.id}
                              whileHover={{ scale: 1.05 }}
                            >
                              <RadioGroupItem
                                value={`${team.id}|${team.name}`}
                                id={`team-${i}`}
                              />
                              <Label
                                htmlFor={`team-${i}`}
                                className="ml-2 dark:text-white"
                              >
                                {team.name}
                              </Label>
                            </motion.div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {errorMessage && (
                  <p className="text-sm text-red-500">{errorMessage}</p>
                )}

                <input type="hidden" {...form.register("action")} />

                <div className="flex justify-between mt-4">
                  <Button
                    type="submit"
                    onClick={() => form.setValue("action", "bid")}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Bid for Player
                  </Button>
                  <Button
                    type="submit"
                    disabled={bidValue <= 0 || disableSoldBtn}
                    onClick={() => form.setValue("action", "sold")}
                    className="bg-red-600 hover:bg-red-700 text-white"
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
                  for {player?.name}
                </p>
              </motion.div>
            )}
          </CardContent>
        </Card>

        <AlertDialogComponent
          showDialog={showDialog}
          onClose={() => setShowDialog(false)}
          title="Are you absolutely sure?"
          description="This will mark the player as SOLD and update their record."
          handleConfirmation={handleSoldConfirmation}
        />
      </DialogContent>
    </Dialog>
  );
}
