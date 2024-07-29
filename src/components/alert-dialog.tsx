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
      <AlertDialogContent className="w-full max-w-xs p-4 sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
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
              className="px-2 py-1 text-sm sm:px-3 sm:py-1.5 sm:text-base md:px-4 md:py-2 md:text-lg"
            >
              Cancel
            </AlertDialogCancel>
          )}
          <AlertDialogAction
            onClick={handleConfirmation}
            className="px-2 py-1 text-sm sm:px-3 sm:py-1.5 sm:text-base md:px-4 md:py-2 md:text-lg bg-green-600 text-white hover:bg-lime-500"
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
