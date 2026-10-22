
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  MoreHorizontal,
  ArrowUpDown,
  ArrowDownWideNarrow,
  ArrowUpAZ,
  ArrowDownAZ,
  CalendarArrowDown,
  CalendarArrowUp,
  Calendar,
  Eye,
  Trash2,
  ArrowDown01,
  ArrowUp01,
  ExternalLink,
} from "lucide-react";

import type { IAuditLog } from "../types/auditLog";
import { Link } from "react-router";

interface AuditLogColumnsProps {
  onView: (log: IAuditLog) => void;
  onDelete: (log: IAuditLog) => void;
  onSort: (
    sortBy: "action" | "user" | "entity" | "createdAt",
    sortOrder: "asc" | "desc"
  ) => void;
  currentSortBy: string;
  currentSortOrder: string;
  userRole: string;
}

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

export function getAuditLogColumns({
  onView,
  onDelete,
  onSort,
  currentSortBy,
  currentSortOrder,
  userRole,
}: AuditLogColumnsProps) {
  const columns = [
    // =========================
    // Action
    // =========================
    {
      id: "action",
      header: "Action",
      cell: ({ row }: { row: { original: IAuditLog } }) => (
        <div className="min-w-0 max-w-32.5 sm:max-w-full">
          <p
            className={`wrap-break-word font-mono text-xs font-bold sm:text-sm ${getActionClassName(
              row.original.action
            )}`}
          >
            {row.original.action}
          </p>

          <p className="mt-1 wrap-break-word font-mono text-[11px] font-medium text-gray-400 sm:text-xs">
            Method: {row.original.httpMethod}
          </p>
        </div>
      ),
    },

    // =========================
    // User
    // =========================
    {
      id: "user",
      header: "User",
      cell: ({ row }: { row: { original: IAuditLog } }) => (
        <div className="flex min-w-0 flex-col gap-1 wrap-break-word font-mono text-xs text-gray-800 sm:text-sm">
          <span className="wrap-break-word">
            {row.original.actorUsername}
          </span>

          <span className="break-all text-[11px] font-medium text-gray-400 sm:text-xs">
            {row.original.actorEmail}
          </span>

          <span
            className={`text-[11px] font-medium sm:text-xs ${getActionClassName(
              row.original.actorRole
            )}`}
          >
            {row.original.actorRole}
          </span>
        </div>
      ),
    },

    // =========================
    // Entity
    // =========================
    {
      id: "entity",
      header: "Entity",
      cell: ({ row }: { row: { original: IAuditLog } }) => (
        <div className="min-w-0 max-w-full">
          <p className="wrap-break-word font-mono text-xs text-gray-800 sm:text-sm">
            {row.original.entityType}
          </p>

          <Link
            to={`/dashboard/${row.original.entityType.toLowerCase()}s/${row.original.entityId}`}
            className="mt-1 flex min-w-0 items-center gap-1 font-mono text-[11px] text-gray-400 hover:underline sm:text-xs"
          >
            <span className="truncate">
              {row.original.entityId}
            </span>

            <ExternalLink className="size-3 shrink-0 sm:size-4" />
          </Link>
        </div>
      ),
    },

    // =========================
    // Time
    // =========================
    {
      id: "createdAt",
      header: "Time",
      cell: ({ row }: { row: { original: IAuditLog } }) => {
        const { time, date } = formatAuditDate(
          row.original.createdAt
        );

        return (
          <div className="min-w-0 font-mono text-xs text-gray-800 sm:text-sm">
            <p className="whitespace-nowrap">{time}</p>

            <p className="mt-1 whitespace-normal text-[11px] text-gray-500 sm:text-xs">
              {date}
            </p>
          </div>
        );
      },
    },

    // =========================
    // Sort & Actions
    // =========================
    {
      id: "sort",

      header: () => (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button
              type="button"
              className="flex cursor-pointer items-center gap-1 whitespace-nowrap font-mono text-xs font-medium text-white sm:gap-1.5 sm:text-sm"
            >
              Sort
              <ArrowDownWideNarrow className="size-4 sm:size-4.5" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            {/* Action sorting */}
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();

                onSort(
                  "action",
                  currentSortBy === "action" &&
                    currentSortOrder === "asc"
                    ? "desc"
                    : "asc"
                );
              }}
            >
              <div className="flex items-center gap-2.5 font-mono text-sm text-black">
                {currentSortBy === "action" ? (
                  currentSortOrder === "asc" ? (
                    <ArrowDownAZ
                      size={18}
                      className="text-blue-600"
                    />
                  ) : (
                    <ArrowUpAZ
                      size={18}
                      className="text-blue-600"
                    />
                  )
                ) : (
                  <ArrowUpDown
                    size={18}
                    className="text-gray-500"
                  />
                )}

                Action

                {currentSortBy === "action" && (
                  <span className="text-[10px] text-gray-500">
                    ({currentSortOrder === "asc" ? "ascending" : "descending"})
                  </span>
                )}
              </div>
            </DropdownMenuItem>

            {/* User sorting */}
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();

                onSort(
                  "user",
                  currentSortBy === "user" &&
                    currentSortOrder === "asc"
                    ? "desc"
                    : "asc"
                );
              }}
            >
              <div className="flex items-center gap-2.5 font-mono text-sm text-black">
                {currentSortBy === "user" ? (
                  currentSortOrder === "asc" ? (
                    <ArrowUp01
                      size={18}
                      className="text-blue-600"
                    />
                  ) : (
                    <ArrowDown01
                      size={18}
                      className="text-blue-600"
                    />
                  )
                ) : (
                  <ArrowUpDown
                    size={18}
                    className="text-gray-500"
                  />
                )}

                User

                {currentSortBy === "user" && (
                  <span className="text-[10px] text-gray-500">
                    ({currentSortOrder === "asc" ? "ascending" : "descending"})
                  </span>
                )}
              </div>
            </DropdownMenuItem>

            {/* Entity sorting */}
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();

                onSort(
                  "entity",
                  currentSortBy === "entity" &&
                    currentSortOrder === "asc"
                    ? "desc"
                    : "asc"
                );
              }}
            >
              <div className="flex items-center gap-2.5 font-mono text-sm text-black">
                {currentSortBy === "entity" ? (
                  currentSortOrder === "asc" ? (
                    <ArrowUp01
                      size={18}
                      className="text-blue-600"
                    />
                  ) : (
                    <ArrowDown01
                      size={18}
                      className="text-blue-600"
                    />
                  )
                ) : (
                  <ArrowUpDown
                    size={18}
                    className="text-gray-500"
                  />
                )}

                Entity

                {currentSortBy === "entity" && (
                  <span className="text-[10px] text-gray-500">
                    ({currentSortOrder === "asc" ? "ascending" : "descending"})
                  </span>
                )}
              </div>
            </DropdownMenuItem>

            {/* Date sorting */}
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();

                onSort(
                  "createdAt",
                  currentSortBy === "createdAt" &&
                    currentSortOrder === "desc"
                    ? "asc"
                    : "desc"
                );
              }}
            >
              <div className="flex items-center gap-2.5 font-mono text-sm text-black">
                {currentSortBy === "createdAt" ? (
                  currentSortOrder === "asc" ? (
                    <CalendarArrowUp
                      size={18}
                      className="text-blue-600"
                    />
                  ) : (
                    <CalendarArrowDown
                      size={18}
                      className="text-blue-600"
                    />
                  )
                ) : (
                  <Calendar
                    size={18}
                    className="text-gray-500"
                  />
                )}

                Newest

                {currentSortBy === "createdAt" && (
                  <span className="text-[10px] text-gray-500">
                    ({currentSortOrder === "asc" ? "ascending" : "descending"})
                  </span>
                )}
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),

      cell: ({ row }: { row: { original: IAuditLog } }) => (
        <DropdownMenu>
          <DropdownMenuTrigger >
            <button
              type="button"
              aria-label="Audit log actions"
              className="flex size-8 cursor-pointer items-center justify-center rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 sm:size-9"
            >
              <MoreHorizontal className="size-4 sm:size-4.5" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-36">
            <DropdownMenuItem
              onClick={() => onView(row.original)}
              className="hover:bg-emerald-50!"
            >
              <span className="flex items-center gap-2.5 font-mono text-sm text-gray-800">
                <Eye size={16} className="text-emerald-500" />
                View
              </span>
            </DropdownMenuItem>

            {userRole === "SUPER_ADMIN" && (
              <DropdownMenuItem
                variant="destructive"
                onClick={() => onDelete(row.original)}
              >
                <span className="flex items-center gap-2.5 font-mono text-sm text-gray-800">
                  <Trash2 size={16} className="text-red-600" />
                  Delete
                </span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return columns;
}
