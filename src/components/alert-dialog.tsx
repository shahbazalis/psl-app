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
      <AlertDialogContent className="w-full max-w-md p-4 sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl sm:text-2xl md:text-3xl">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="mt-2 text-base sm:text-lg md:text-xl">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4 flex justify-end space-x-2">
          {!registration && (
            <AlertDialogCancel
              onClick={onClose}
              className="px-4 py-2 text-base sm:text-lg"
            >
              Cancel
            </AlertDialogCancel>
          )}
          <AlertDialogAction
            onClick={handleConfirmation}
            className="px-4 py-2 text-base sm:text-lg bg-green-600 text-white hover:bg-lime-500"
          >
            Ok
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
