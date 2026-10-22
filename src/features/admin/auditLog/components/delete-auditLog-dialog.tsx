
import { TriangleAlert } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button/button";
import FormFeedback from "@/shared/components/form-feedback";
import type { IApiError } from "@/shared/types/api";
import type { IAuditLog } from "../types/auditLog";
import { useDeleteAuditLog } from "../apis/mutations/use-delete-auditLog";
import { useClearAllAuditLogs } from "../apis/mutations/use-clear-auditLogs";
import { useNavigate } from "react-router";

interface DeleteAuditLogDialogProps {
  open: boolean;
  mode: "single" | "all";
  auditLog?: IAuditLog | null;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteAuditLogDialog({
  open,
  mode,
  auditLog,
  onOpenChange,
}: DeleteAuditLogDialogProps) {
  const navigate = useNavigate();
  // delete single audit log mutation
  const {
    mutate: deleteAuditLog,
    error: deleteError,
    isPending: deletePending,
  } = useDeleteAuditLog();
// clear all audit logs mutation
  const {
    mutate: clearAllAuditLogs,
    error: clearAllError,
    isPending: clearAllPending,
  } = useClearAllAuditLogs();

  const error =
    mode === "single" ? deleteError : clearAllError;

  const apiError = error as IApiError | null;

  const isPending = deletePending || clearAllPending;

  const handleConfirm = () => {
    if (isPending) return;

    if (mode === "single") {
      if (!auditLog) return;

      deleteAuditLog(auditLog.id, {
        onSuccess: () => {
          onOpenChange(false);
          navigate("/dashboard/audit-logs");
        }
      });

      return;
    }

    clearAllAuditLogs(undefined, {
      onSuccess: () => onOpenChange(false),
    });
  };

  const title =
    mode === "single"
      ? "Are you sure you want to delete this audit log?"
      : "Are you sure you want to delete all audit logs?";

  const description =
    mode === "single"
      ? "This audit log will be permanently deleted."
      : "All audit logs will be permanently deleted. This action cannot be undone.";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-5 p-8 text-center sm:max-w-105">
        <DialogTitle className="sr-only">
          {mode === "single" ? "Delete Audit Log" : "Clear All Audit Logs"}
        </DialogTitle>

        <TriangleAlert className="mx-auto size-10 text-red-500" />

        <div>
          <p className="font-mono font-semibold text-red-600">
            {title}
          </p>

          <p className="mt-1 font-mono text-sm text-gray-500">
            {description}
          </p>
        </div>

        <FormFeedback errors={apiError ? [apiError.message] : []} />

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="flex-1"
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirm}
            isLoading={isPending}
            className="flex-1"
          >
            {isPending
              ? "Deleting..."
              : mode === "single"
                ? "Yes, delete"
                : "Yes, clear all"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
