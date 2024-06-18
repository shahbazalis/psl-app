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
import { Checkbox } from "@/components/ui/checkbox";
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
import { Player } from "@/app/players/page";
import {
  DeletePlayer,
  UpdatePlayer,
} from "@/app/server-actions/players-actions";
import { TeamsList, Team } from "@/app/server-actions/teams-actions";
export type Team = {
  id: string;
  name: string;
};

export default function PlayersTable({ players }: { players: Player[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamName, setTeamName] = useState("");
  useEffect(() => {
    const getListofPlayers = async () => {
      const players = await TeamsList();
      setTeams(players);
    };

    getListofPlayers();
  }, []);

  const columns: ColumnDef<Player>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status: string = row.getValue("status");

        const handleStatusChange = (event: { target: { value: string } }) => {
          const newStatus = event.target.value;
          UpdatePlayer(row.original.id, newStatus);
        };

        return (
          <select
            value={status}
            onChange={handleStatusChange}
            disabled={!row.getIsSelected()}
            className="capitalize border rounded px-2 py-1"
          >
            <option value="SOLD">SOLD</option>
            <option value="UNSOLD">UNSOLD</option>
          </select>
        );
      },
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
        const findTeam: Team | undefined = teams.find((team) => {
          if (teamId === team.id) return team;
        });
        console.log("Team findersdsd:", row.original.id);

        const handleStatusChange = (value: string) => {
          setTeamName(value);
          // console.log("row:", row);
          // console.log("Team:", value);
          // const newTeam = value;
          if (row.getIsSelected()) {
            UpdatePlayer(row.original.id, row.original.status, teamId);
          }
        };

        return (
          <Select
            onValueChange={handleStatusChange}
            value={teamName}
            defaultValue={findTeam ? findTeam.name : "No Team"}
            disabled={!row.getIsSelected()}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select a Team" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Teams</SelectLabel>
                {teams.map((team: Team) => (
                  <SelectItem value={team.name} key={team.id}>
                    {team.name === "Default Team" ? "No Team" : team.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        );

        // <Select
        //   onValueChange={handleStatusChange}
        //   value={teamId.toString()}
        //   defaultValue={teamId.toString()}
        //   disabled={!row.getIsSelected()}
        // >
        //   <SelectTrigger className="w-[180px]">
        //     <SelectValue placeholder="Select" />
        //   </SelectTrigger>
        //   <SelectContent position="popper">
        //     {teams.map((team: Team) => (
        //       <SelectItem value={team.name} key={team.id} >
        //         {team.name === "Default Team" ? "No Team" : team.name}
        //       </SelectItem>
        //     ))}
        //   </SelectContent>
        // </Select>
        // <select
        //   value={teamId}
        //   onChange={handleStatusChange}
        //   disabled={!row.getIsSelected()}
        //   className="capitalize border rounded px-2 py-1"
        // >
        //   {teams.map((team: Team) => (
        //     <option style={{marginBottom : '5px'}} key={team.id} value={team.name}>
        //       {
        //         team.name === "Default Team" ? "No Team" : team.name
        //       }

        //     </option>
        //   ))}
        // </select>
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      enableHiding: true,
      cell: ({ row }) => {
        const player = row.original;

        return (
          <Button
            variant="ghost"
            className="flex items-center space-x-2"
            onClick={() => DeletePlayer(player.id)}
            disabled={!row.getIsSelected()}
          >
            <Trash2 className="h-6 w-6 text-red-700" />
          </Button>
        );
      },
    },
  ];

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
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
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
      </div>
    </div>
  );
}
