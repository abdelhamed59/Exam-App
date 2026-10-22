import { TriangleAlert } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button/button";
import FormFeedback from "@/shared/components/form-feedback";
import type { IApiError } from "@/shared/types/api";
import { useNavigate } from "react-router";
import type { IAdminDiploma } from "../types/admin-diploma";
import { useDeleteDiploma } from "../apis/mutations/use-delete-diploma";

interface DeleteDiplomaDialogProps {
  diploma: IAdminDiploma | null;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteDiplomaDialog({ diploma, onOpenChange }: DeleteDiplomaDialogProps) {
    const navigate=useNavigate()
  const { mutate: deleteDiploma, error, isPending } = useDeleteDiploma();
  const apiError = error as IApiError | null;

  const handleConfirm = () => {
    if (!diploma) return;
    deleteDiploma(diploma.id, { onSuccess: () =>{ 
        onOpenChange(false)
        navigate("/dashboard/diplomas")
        
    } });
  };

  return (
    <Dialog open={!!diploma} onOpenChange={onOpenChange}>
      <DialogContent className="gap-5 p-8 text-center sm:max-w-105">
        <DialogTitle className="sr-only">Delete diploma</DialogTitle>

        <TriangleAlert className="mx-auto size-10 text-red-500" />

        <div>
          <p className="font-mono font-semibold text-red-600">
            Are you sure you want to delete "{diploma?.title}"?
          </p>
          <p className="mt-1 font-mono text-sm text-gray-500">This action is permanent and cannot be undone.</p>
        </div>

        <FormFeedback errors={apiError ? [apiError.message] : []} />

        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={handleConfirm} isLoading={isPending} className="flex-1">
            Yes, delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}