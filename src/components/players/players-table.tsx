"use client";

import { useState, useEffect } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  UserRoundX,
  UserPlus,
  BookUser,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AddAdmin } from "@/app/server-actions/admins-actions";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Player } from "@/app/players/page";
import {
  UpdatePlayer,
  DeletePlayer,
} from "@/app/server-actions/players-actions";
import { TeamsList } from "@/app/server-actions/teams-actions";
import { setCookie, getCookie } from "@/lib/cookies";
import { Team } from "@/app/teams/page";
import { AlertDialogComponent } from "@/components/alert-dialog";

type PlayersTableProps = {
  players: Player[];
};

export default function PlayersTable({
  players: initialPlayers,
}: PlayersTableProps) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [teams, setTeams] = useState<Team[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [addAdminMessage, setAddAdminMessage] = useState("");
  const [deleteAlertTitle, setDeleteAlertTitle] = useState("");
  const [addAdminId, setAddAdminId] = useState("");
  const [deletedPlayer, setDeletedPlayer] = useState<Player | null>(null);
  const router = useRouter();

  useEffect(() => {
    setPlayers(initialPlayers);
  }, [initialPlayers]);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      let fetchAdminStatus = await getCookie("admin");
      if (fetchAdminStatus) {
        let admin = JSON.parse(fetchAdminStatus);
        setIsAdmin(admin);
      }
    };

    fetchAdminStatus();
  }, []);

  useEffect(() => {
    const fetchTeams = async () => {
      const fetchedTeams = await TeamsList();
      setTeams(fetchedTeams);
      await setCookie("teams", JSON.stringify(fetchedTeams));
    };

    fetchTeams();
  }, []);

  const handleTeamChange = async (playerId: string, newTeamId: string) => {
    const selectedTeam = teams.find((team) => team.id === newTeamId);
    const newStatus = selectedTeam?.name === "Default Team" ? "UNSOLD" : "SOLD";

    await UpdatePlayer(playerId, newStatus, newTeamId);

    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === playerId
          ? { ...player, status: newStatus, teamId: newTeamId }
          : player
      )
    );
  };
  const handleDeletePlayer = async (dltdPlayer: Player) => {
    if (dltdPlayer.status === "SOLD") {
      setDeleteAlertTitle("Sorry!");
      setDeleteMessage(
        "This player is already sold; therefore, it cannot be deleted."
      );
    } else {
      setDeleteAlertTitle("Are you absolutely sure?");
      setDeleteMessage(
        "This player will be deleted, and this action cannot be undone."
      );
    }
    setShowDialog(true);
    setDeletedPlayer(dltdPlayer);
  };

  const handleAddAdmin = async (playerId: string) => {
    setDeleteAlertTitle("Are you absolutely sure?");
    setAddAdminMessage("Are you sure you want to add this player as an admin?");
    setShowDialog(true);
    setAddAdminId(playerId);
  };

  const handlePlayerDetails = async (player: Player) => {
    await setCookie("player", JSON.stringify(player));
    router.push("/players/player");
  };

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const handleDeleteConfirmation = async () => {
    if (deletedPlayer && deletedPlayer.status != "SOLD") {
      await DeletePlayer(deletedPlayer.id);
      setPlayers(players.filter((player) => player.id !== deletedPlayer.id));
    }
    setShowDialog(false);
  };

  const handleAddAdminConfirmation = async () => {
    await AddAdmin(addAdminId);
    setShowDialog(false);
  };

  const columns: ColumnDef<Player>[] = [
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("status")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("role")}</div>
      ),
    },
    {
      accessorKey: "nationality",
      header: "Nationality",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("nationality")}</div>
      ),
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
      cell: ({ row }) => <div>{row.getValue("phoneNumber")}</div>,
    },
    {
      accessorKey: "teamId",
      header: "Team",
      cell: ({ row }) => {
        const teamId: string = row.original.teamId;

        return (
          <Select
            onValueChange={(newTeamId) =>
              handleTeamChange(row.original.id, newTeamId)
            }
            value={teamId}
            disabled={!isAdmin}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select a Team" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Teams</SelectLabel>
                {teams.map((team: Team) => (
                  <SelectItem key={team.id} value={team.id}>
                    {team.name === "Default Team" ? "No Team" : team.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      },
    },
  ];

  if (isAdmin) {
    columns.push({
      accessorKey: "actions",
      header: "Actions",
      enableHiding: true,
      cell: ({ row }) => {
        const player = row.original;

        return (
          <div className="flex flex-row">
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2"
                      onClick={() => handleDeletePlayer(player)}
                      disabled={player.status==='SOLD'}
                    >
                      <UserRoundX className="h-5 w-5 text-red-700" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Remove Player Registration</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2"
                      onClick={() => handleAddAdmin(player.id)}
                    >
                      <UserPlus className="h-5 w-5 text-blue-700" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add Player as an Admin</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2"
                      onClick={() => handlePlayerDetails(player)}
                      disabled={player.status==='SOLD'}
                    >
                      <BookUser className="h-5 w-5 text-blue-700" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Open Player Details</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        );
      },
    });
  }

  const table = useReactTable({
    data: players,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Total Registered Players are {table.getFilteredRowModel().rows.length}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
        <div>
          <AlertDialogComponent
            showDialog={showDialog}
            onClose={handleDialogClose}
            title={deleteAlertTitle}
            description={deleteMessage || addAdminMessage}
            handleConfirmation={
              handleDeleteConfirmation || handleAddAdminConfirmation
            }
          />
        </div>
      </div>
    </div>
  );
}