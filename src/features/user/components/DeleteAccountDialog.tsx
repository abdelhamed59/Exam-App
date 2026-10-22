import { TriangleAlert, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button/button";
import { useDeleteAccount } from "../apis/mutations/useDeleteAccount";
import useLogout from "@/hooks/logOut";

interface DeleteAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteAccountDialog({
  open,
  onOpenChange,
}: DeleteAccountDialogProps) {
  const deleteAccountMutation = useDeleteAccount();
        const { handleLogout } = useLogout();
  

  const handleDelete = () => {
    deleteAccountMutation.mutate(undefined, {
      onSuccess: () => {
        onOpenChange(false);
         handleLogout()
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex flex-col justify-between sm:max-w-139.5 p-0"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 text-gray-400 transition-colors hover:text-gray-700"
        >
          <X className="size-4" />
        </button>

        {/* Content */}
        <div className="flex flex-col items-center justify-between gap-7.5 p-9">
          
          {/* Warning Icon */}
          <div className=" flex size-22 items-center justify-center rounded-full bg-red-50">
            <div className="flex size-16 items-center justify-center rounded-full bg-red-100">
              <TriangleAlert
                className="size-9 text-red-500"
                strokeWidth={1.8}
              />
            </div>
          </div>

          <div className="content">
            {/* Title */}
          <h2 className="text-center font-mono text-lg font-medium text-red-600">
            Are you sure you want to delete your account?
          </h2>

          {/* Description */}
          <p className="text-center font-mono text-sm text-gray-500">
            This action is permanent and cannot be undone.
          </p>
          </div>
        </div>

        {/* Footer */}
        <div className="grid lg:grid-cols-2  border-t border-gray-200 p-6 gap-2.5 bg-gray-50">
          <Button
            type="button"
            disabled={deleteAccountMutation.isPending}
            onClick={() => onOpenChange(false)}
            className=" bg-gray-200 font-mono text-sm font-medium text-gray-800 hover:bg-gray-200 "
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            disabled={deleteAccountMutation.isPending}
            onClick={handleDelete}
            className=" rounded-none font-mono text-xs"
          >
            {deleteAccountMutation.isPending
              ? "Deleting..."
              : "Yes, delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}