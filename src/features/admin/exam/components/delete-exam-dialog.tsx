import { TriangleAlert } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button/button";
import FormFeedback from "@/shared/components/form-feedback";
import type { IApiError } from "@/shared/types/api";
import { useNavigate } from "react-router";
import { useDeleteExam } from "../apis/mutations/use-delete-exam";
import type { IAdminExam } from "../types/admin-exam";

interface DeleteExamDialogProps {
  exam: IAdminExam | null;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteExamDialog({ exam, onOpenChange }: DeleteExamDialogProps) {
    const navigate=useNavigate()
  const { mutate: deleteExam, error, isPending } = useDeleteExam();
  const apiError = error as IApiError | null;

  const handleConfirm = () => {
    if (!exam) return;
    deleteExam(exam.id, { onSuccess: () =>{ 
        onOpenChange(false)
        navigate("/dashboard/exams")
        
    } });
  };

  return (
    <Dialog open={!!exam} onOpenChange={onOpenChange}>
      <DialogContent className="gap-5 p-8 text-center sm:max-w-105">
        <DialogTitle className="sr-only">Delete Exam</DialogTitle>

        <TriangleAlert className="mx-auto size-10 text-red-500" />

        <div>
          <p className="font-mono font-semibold text-red-600">
            Are you sure you want to delete "{exam?.title}"?
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