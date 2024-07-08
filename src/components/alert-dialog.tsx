import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export type AlertDialogProps = {
  showDialog: boolean;
  onClose: () => void;
  registration?: boolean;
  title: string;
  description: string;
  handleConfirmation: () => void;
};

export function AlertDialogComponent({
  showDialog,
  onClose,
  registration,
  title,
  description,
  handleConfirmation,
}: AlertDialogProps) {
  return (
    <AlertDialog open={showDialog} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {registration ? null : (
            <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          )}
          <AlertDialogAction
            onClick={handleConfirmation}
            className={"bg-green-600 text-white hover:bg-lime-500"}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
