import { TriangleAlert } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button/button";
import FormFeedback from "@/shared/components/form-feedback";
import type { IApiError } from "@/shared/types/api";
import type { IAdminQuestion } from "../types/admin-question";
import { useDeleteQuestion } from "../apis/mutations/use-delete-question";

interface DeleteQuestionDialogProps {
  question: IAdminQuestion | null;
  onOpenChange: (open: boolean) => void;
    onDeleted?: () => void;
}

export default function DeleteQuestionDialog({ question, onOpenChange,onDeleted }: DeleteQuestionDialogProps) {
  const { mutate: deleteQuestion, error, isPending } = useDeleteQuestion();
  const apiError = error as IApiError | null;

  const handleConfirm = () => {
    if (!question) return;
    deleteQuestion(question.id, { onSuccess: () =>{ 
        onOpenChange(false)
        onDeleted?.()
        
    } });
  };

  return (
    <Dialog open={!!question} onOpenChange={onOpenChange}>
      <DialogContent className="gap-5 p-8 text-center sm:max-w-105">
        <DialogTitle className="sr-only">Delete Exam</DialogTitle>

        <TriangleAlert className="mx-auto size-10 text-red-500" />

        <div>
          <p className="font-mono font-semibold text-red-600">
            Are you sure you want to delete "{question?.text}"?
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