import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CreateTeam } from "@/app/server-actions/teams-actions";
import { AddTeamSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Team } from "@/app/teams/page";
type AddTeamFormProps = {
  onClose: () => void;
  addNewTeam: (newTeam: Team) => void;
};
type AddTeamProps = {
  addNewTeam: (newTeam: Team) => void;
};

export function AddTeamForm({ onClose, addNewTeam }: AddTeamFormProps) {
  const form = useForm({
    resolver: zodResolver(AddTeamSchema),
    defaultValues: {
      name: "",
    },
  });
  const handleSubmit = async (data: z.infer<typeof AddTeamSchema>) => {
    const response = await CreateTeam(data.name);
    if (response.name){
      addNewTeam(response);
      onClose();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter Team Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className=" bg-green-800">
          Save
        </Button>
      </form>
    </Form>
  );
}

export default function AddTeam({ addNewTeam }: AddTeamProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-10 w-24 bg-green-700 hover:bg-lime-500"
          onClick={handleDialogOpen}
        >
          Add Team
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle ml-2 h-4 w-4>
            Add Team
          </DialogTitle>
          <DialogDescription>
            Add Team name here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <AddTeamForm onClose={handleDialogClose} addNewTeam={addNewTeam}/>
        </div>
      </DialogContent>
    </Dialog>
  );
}
