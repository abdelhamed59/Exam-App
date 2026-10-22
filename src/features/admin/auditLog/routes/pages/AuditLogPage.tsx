
import Breadcrumb from "@/shared/components/page-header/Breadcrumb";
import { Link, useParams } from "react-router";
import { useAdminAuditLog } from "../../apis/queries/use-auditLog";
import { ExternalLink, Trash2 } from "lucide-react";
import { useCurrentUser } from "@/features/user/apis/queries/use-current-user";
import { Button } from "@/components/ui/button/button";
import { useState } from "react";
import DeleteAuditLogDialog from "../../components/delete-auditLog-dialog";

const getActionClassName = (action: string) => {
  switch (action) {
    case "CREATE":
      return "text-emerald-600";
    case "UPDATE":
      return "text-yellow-600";
    case "DELETE":
      return "text-red-600";
    case "SET_IMMUTABLE":
      return "text-purple-600";
    case "SEED_DATA":
      return "text-amber-600";
    case "SUPER_ADMIN":
      return "text-red-600";
    case "ADMIN":
      return "text-blue-600";
    default:
      return "text-gray-600";
  }
};

const formatAuditDate = (date: string) => {
  const parsedDate = new Date(date);

  return {
    time: parsedDate.toLocaleTimeString("en", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }),
    date: parsedDate.toLocaleDateString("en", {
      weekday: "short",
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
  };
};

export default function AuditLogPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useAdminAuditLog(id!);
  const { data: user } = useCurrentUser();

  const userRole = user?.user.role;
  const [selectedAuditLog, setSelectedAuditLog] = useState(false);

  if (isLoading) {
    return (
      <div className="p-4 font-mono text-sm text-gray-500 sm:p-6">
        Loading...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-4 font-mono text-sm text-red-500 sm:p-6">
        Audit log not found
      </div>
    );
  }

  const title = `${data.category?.at(0)?.toUpperCase()}${data.category?.slice(1).toLowerCase()} ${data.action?.at(0)?.toUpperCase()}${data.action?.slice(1).toLowerCase()} By ${data.actorUsername}`;

  const { time, date } = formatAuditDate(data.createdAt ?? "");
  const metadata = data.metadata;
  const updatedFields = metadata ? Object.keys(metadata) : [];

  const entityCategory =
    data.category?.at(0)?.toUpperCase() +
    data.category?.slice(1).toLowerCase();

  return (
    <div className="min-w-0 w-full">
      <Breadcrumb breadcrumb={["Audit Logs", title]} />

      {/* Header */}
      <div className="flex min-w-0 flex-col gap-3 border-t border-gray-100 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="min-w-0 flex-1">
          <h2 className="wrap-break-word font-inter text-base font-semibold sm:text-lg">
            {title}
          </h2>

          <p className="mt-2 flex flex-wrap items-start gap-1 font-inter text-xs text-gray-400 sm:text-sm">
            <span className="shrink-0">Entity:</span>

            <Link
              to={`/dashboard/${data.category?.toLowerCase()}s/${data.entityId}`}
              className="inline-flex min-w-0 items-center gap-1 break-all underline"
            >
              <span>
                {entityCategory} [{data.entityId}]
              </span>
              <ExternalLink className="size-3.5 shrink-0" />
            </Link>
          </p>
        </div>

        {userRole === "SUPER_ADMIN" && (
          <Button
            variant="destructive"
            onClick={() => setSelectedAuditLog(true)}
            className="w-full shrink-0 px-4 text-white sm:w-auto"
          >
            <Trash2 className="size-4 sm:size-4.5" />
            Delete
          </Button>
        )}
      </div>

      {/* Audit log details */}
      <div className="min-w-0 p-3 sm:p-6">
        <div className="flex min-w-0 flex-col gap-5 rounded-lg bg-white p-4 sm:gap-6 sm:p-6">
          {/* Action */}
          <div className="flex min-w-0 flex-col gap-1">
            <p className="font-mono text-xs text-gray-400 sm:text-sm">
              Action
            </p>

            <span
              className={`wrap-break-word font-mono text-sm font-bold ${getActionClassName(data.action)}`}
            >
              {data.action}
            </span>
          </div>

          {/* Method */}
          <div className="flex min-w-0 flex-col gap-1">
            <p className="font-mono text-xs text-gray-400 sm:text-sm">
              Method
            </p>

            <span className="wrap-break-word font-mono text-sm text-gray-800">
              {data.httpMethod}
            </span>
          </div>

          {/* User */}
          <div className="flex min-w-0 flex-col gap-1">
            <p className="font-mono text-xs text-gray-400 sm:text-sm">
              User
            </p>

            <span className="wrap-break-word font-mono text-sm text-gray-800">
              {data.actorUsername}
            </span>

            <p className="break-all font-mono text-xs text-gray-500 sm:text-sm">
              Email: {data.actorEmail}
            </p>

            <p className="break-all font-mono text-xs text-gray-500 sm:text-sm">
              IP Address: {data.ipAddress}
            </p>

            <p className="font-mono text-xs text-gray-500 sm:text-sm">
              Role:{" "}
              <span className={getActionClassName(data.actorRole)}>
                {data.actorRole}
              </span>
            </p>
          </div>

          {/* Entity */}
          <div className="flex min-w-0 flex-col gap-1">
            <p className="font-mono text-xs text-gray-400 sm:text-sm">
              Entity
            </p>

            <div className="flex min-w-0 flex-wrap items-start gap-2 font-inter text-sm text-gray-800">
              <span className="shrink-0">{entityCategory}:</span>

              <Link
                to={`/dashboard/${data.category?.toLowerCase()}s/${data.entityId}`}
                className="inline-flex min-w-0 items-center gap-1 break-all hover:underline"
              >
                <span>{data.entityId}</span>
                <ExternalLink className="size-3.5 shrink-0" />
              </Link>
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex min-w-0 flex-col gap-1">
            <p className="font-mono text-xs text-gray-400 sm:text-sm">
              Date & Time
            </p>

            <div className="flex flex-col gap-1 font-mono text-sm text-gray-800 sm:flex-row sm:flex-wrap sm:gap-2">
              <span>{time}</span>
              <span className="hidden sm:inline">|</span>
              <span>{date}</span>
            </div>
          </div>

          {/* Metadata */}
          {data.action === "UPDATE" && (
            <div className="flex min-w-0 flex-col gap-2">
              <p className="font-mono text-xs text-gray-400 sm:text-sm">
                Metadata
              </p>

              <div className="min-w-0 overflow-hidden rounded-md bg-gray-100 p-3 sm:p-4">
                {updatedFields.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {updatedFields.map((field: string) => (
                      <p
                        key={field}
                        className="wrap-break-word font-mono text-xs text-gray-800 sm:text-sm"
                      >
                        <span className="font-semibold">{field}:</span>{" "}
                        <span className="whitespace-pre-wrap break-all">
                          {String(metadata?.[field] ?? "")}
                        </span>
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    No updated fields.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete dialog */}
      <DeleteAuditLogDialog
        open={selectedAuditLog}
        mode="single"
        auditLog={data}
        onOpenChange={setSelectedAuditLog}
      />
    </div>
  );
}
