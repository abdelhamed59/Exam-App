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
  PenLine,
  Trash2,
} from "lucide-react";

import type { IAdminQuestion } from "@/features/admin/question/types/admin-question";

interface AdminQuestionColumnsProps {
  onView: (question: IAdminQuestion) => void;

  onEdit: (question: IAdminQuestion) => void;

  onDelete: (question: IAdminQuestion) => void;

  onSort: (
    sortBy: "title" | "createdAt",
    sortOrder: "asc" | "desc"
  ) => void;

  currentSortBy: string;

  currentSortOrder: string;

  isSuperAdmin: boolean;
}

export function getAdminQuestionColumns({
  onView,
  onEdit,
  onDelete,
  onSort,
  currentSortBy,
  currentSortOrder,
  isSuperAdmin,
}: AdminQuestionColumnsProps) {
  const columns = [
{
  id: "title",
  header: "Title",
  cell: ({ row }: { row: { original: IAdminQuestion } }) => (
    <div
      className="w-full min-w-0 truncate font-mono text-xs text-gray-800 sm:text-sm"
      title={row.original.text}
    >
      {row.original.text}
    </div>
  ),
},
    {
      id: "sort",

      header: () => (
        <div className="flex justify-end pe-1 sm:pe-2">
          <DropdownMenu >
          <DropdownMenuTrigger>
            
<button
  type="button"
  className="flex cursor-pointer items-center gap-1 whitespace-nowrap font-mono text-xs font-medium sm:gap-1.5 sm:text-sm"
>
  Sort
  <ArrowDownWideNarrow size={16} className="sm:size-4.5" />
</button>

          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-56"
          >
            {/* Title Sort */}
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();

                onSort(
                  "title",
                  currentSortBy === "title" &&
                    currentSortOrder === "asc"
                    ? "desc"
                    : "asc"
                );
              }}
            >
              {currentSortBy === "title" ? (
                currentSortOrder === "asc" ? (
                  <div className="flex items-center gap-2.5 font-mono text-sm text-black">
                    <ArrowDownAZ
                      size={18}
                      className="text-blue-600"
                    />

                    Title

                    <span className="text-[10px] text-gray-500">
                      (ascending)
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5 font-mono text-sm text-black">
                    <ArrowUpAZ
                      size={18}
                      className="text-blue-600"
                    />

                    Title

                    <span className="text-[10px] text-gray-500">
                      (descending)
                    </span>
                  </div>
                )
              ) : (
                <div className="flex items-center gap-2.5 font-mono text-sm text-black">
                  <ArrowUpDown
                    size={18}
                    className="text-gray-500"
                  />

                  Title
                </div>
              )}
            </DropdownMenuItem>

            {/* Created At Sort */}
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
              {currentSortBy === "createdAt" ? (
                currentSortOrder === "asc" ? (
                  <div className="flex items-center gap-2.5 font-mono text-sm text-black">
                    <CalendarArrowUp
                      size={18}
                      className="text-blue-600"
                    />

                    Newest

                    <span className="text-[10px] text-gray-500">
                      (ascending)
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5 font-mono text-sm text-black">
                    <CalendarArrowDown
                      size={18}
                      className="text-blue-600"
                    />

                    Newest

                    <span className="text-[10px] text-gray-500">
                      (descending)
                    </span>
                  </div>
                )
              ) : (
                <div className="flex items-center gap-2.5 font-mono text-sm text-black">
                  <Calendar
                    size={18}
                    className="text-gray-500"
                  />

                  Newest
                </div>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      ),

      cell: ({
        row,
      }: {
        row: {
          original: IAdminQuestion;
        };
      }) => {
        const question = row.original;

        const canModify =
          !question.immutable || isSuperAdmin;

        return (
          <div className="flex justify-end pe-2">
             <DropdownMenu>
            <DropdownMenuTrigger>
              <button
                type="button"
                className="flex size-7.5 max-w-20 cursor-pointer items-center justify-center gap-1.5 bg-gray-200 text-gray-800"
              >
                <MoreHorizontal size={18} />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="max-w-34"
            >
              {/* View */}
              <DropdownMenuItem
                onClick={() => onView(question)}
                className="hover:bg-emerald-50!"
              >
                <span className="flex items-center justify-center gap-2.5 font-mono text-sm text-gray-800">
                  <Eye
                    size={16}
                    className="text-emerald-500"
                  />

                  View
                </span>
              </DropdownMenuItem>

              {/* Edit */}
              {canModify && (
                <DropdownMenuItem
                  onClick={() => onEdit(question)}
                >
                  <span className="flex items-center justify-center gap-2.5 font-mono text-sm text-gray-800">
                    <PenLine
                      size={16}
                      className="text-blue-600"
                    />

                    Edit
                  </span>
                </DropdownMenuItem>
              )}

              {/* Delete */}
              {canModify && (
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => onDelete(question)}
                >
                  <span className="flex items-center justify-center gap-2.5 font-mono text-sm text-gray-800">
                    <Trash2
                      size={16}
                      className="text-red-600"
                    />

                    Delete
                  </span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return columns;
}