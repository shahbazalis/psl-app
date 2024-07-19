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
import { ArrowUpDown, ChevronDown, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { DeleteTeam } from "@/app/server-actions/teams-actions";
import { getCookie } from "@/lib/cookies";
import { Team } from "@/app/teams/page";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

import { AlertDialogComponent } from "@/components/alert-dialog";

export type TeamsTableProps = {
  teams: Team[];
  setTeams?: (teams: Team[]) => void;
  selectedTeam?: Team | null;
  setSelectedTeam?: (team: Team) => void;
  component: string;
};

export default function TeamsTable({
  teams,
  setTeams,
  selectedTeam,
  setSelectedTeam,
  component,
}: TeamsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [teamId, setTeamId] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [deleteAlertTitle, setDeleteAlertTitle] = useState("");
  const [teamTobeDeleted, setTeamTobeDeleted] = useState<Team | null>(null);
  const { toast } = useToast();

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

  const handleDeleteTeam = async (id: string) => {
    const dltTeam = teams.find((team) => team.id === id);
    if (dltTeam) {
      setTeamTobeDeleted(dltTeam);
      if (dltTeam.players && dltTeam.players.length > 0) {
        setDeleteAlertTitle("Sorry!");
        setDeleteMessage(
          "This team has acquired some players; therefore, it cannot be deleted."
        );
      } else {
        setDeleteAlertTitle("Are you absolutely sure?");
        setDeleteMessage(
          "This team will be deleted, and this action cannot be undone."
        );
      }
    }
    setShowDialog(true);
    setTeamId(id);
  };
  const handleRowClick = (team: Team) => {
    if (setSelectedTeam) {
      setSelectedTeam(team);
    }
  };
  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const handleDeleteConfirmation = async () => {
    if (
      teamTobeDeleted &&
      (!teamTobeDeleted.players || teamTobeDeleted.players.length === 0)
    ) {
      const response = await DeleteTeam(teamId);
      if (response.statusCode !== 500) {
        setTeams(teams.filter((team) => team.id !== teamId));
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: response.message,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    }
    setShowDialog(false);
  };

  const columns: ColumnDef<Team>[] = [
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
  ];
  if (component !== "Dashboard" && isAdmin) {
    columns.push({
      accessorKey: "actions",
      header: "Actions",
      enableHiding: true,
      cell: ({ row }) => {
        const teamForDeletion = row.original;
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2"
                  onClick={() => handleDeleteTeam(teamForDeletion.id)}
                >
                  <Trash2 className="h-6 w-6 text-red-700" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete Team</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
    });
  }

  const table = useReactTable({
    data: teams,
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
    <div className={"w-full"}>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
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
            {table.getFilteredRowModel().rows ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <TableRow
                    key={row.original.id}
                    onClick={() => handleRowClick(row.original)}
                    className={
                      selectedTeam?.id === row.original.id
                        ? "bg-slate-300 hover:bg-blue-200"
                        : ""
                    }
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
                );
              })
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
          Total Registered Teams are {table.getFilteredRowModel().rows.length}
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
            description={deleteMessage}
            handleConfirmation={handleDeleteConfirmation}
          />
        </div>
      </div>
    </div>
  );
}
