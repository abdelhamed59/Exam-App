

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
  ArrowDown01,
  ArrowUp01,
} from "lucide-react";

import type { IAdminExam } from "../../types/admin-exam";

interface AdminExamColumnsProps {
  onView: (exam: IAdminExam) => void;
  onEdit: (exam: IAdminExam) => void;
  onDelete: (exam: IAdminExam) => void;
  onSort: (
    sortBy: "title" | "createdAt" | "questions",
    sortOrder: "asc" | "desc",
  ) => void;
  currentSortBy: string;
  currentSortOrder: string;
}

export function getAdminExamColumns({
  onView,
  onEdit,
  onDelete,
  onSort,
  currentSortBy,
  currentSortOrder,
}: AdminExamColumnsProps) {
  const columns = [
    {
      id: "image",
      header: "Image",
      cell: ({ row }: { row: { original: IAdminExam } }) => {
        const exam = row.original;

        return exam.image ? (
          <img
            src={exam.image}
            alt={exam.title}
            loading="lazy"
            className="h-14 w-12 rounded object-cover sm:h-20 sm:w-17.5"
          />
        ) : (
          <div className="h-14 w-12 rounded bg-gray-200 sm:h-20 sm:w-17.5" />
        );
      },
    },

    {
      id: "title",
      header: "Title",
      cell: ({ row }: { row: { original: IAdminExam } }) => (
        <div
          className="w-full min-w-0 truncate font-mono text-xs text-gray-800 sm:text-sm"
          title={row.original.title}
        >
          {row.original.title}
        </div>
      ),
    },

    {
      id: "diploma",
      header: "Diploma",
      cell: ({ row }: { row: { original: IAdminExam } }) => (
        <div
          className="w-full min-w-0 truncate font-mono text-xs text-gray-500 sm:text-sm"
          title={row.original.diploma.title}
        >
          {row.original.diploma.title}
        </div>
      ),
    },

    {
      id: "questions",
      header: () => (
        <div className="whitespace-normal text-center leading-tight">
          <span className="sm:hidden">Questions</span>
          <span className="hidden sm:inline">No. of Questions</span>
        </div>
      ),
      cell: ({ row }: { row: { original: IAdminExam } }) => (
        <div className="text-center font-mono text-xs text-gray-500 sm:text-sm">
          {row.original.questionsCount}
        </div>
      ),
    },

    {
      id: "sort",
      header: () => (
        <div className="flex justify-end pe-1 sm:pe-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button
                type="button"
                className="flex cursor-pointer items-center gap-1 whitespace-nowrap font-mono text-xs font-medium text-white sm:gap-1.5 sm:text-sm"
              >
                Sort
                <ArrowDownWideNarrow
                  size={16}
                  className="sm:size-4.5"
                />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              {/* Title sort */}
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();

                  onSort(
                    "title",
                    currentSortBy === "title" &&
                      currentSortOrder === "asc"
                      ? "desc"
                      : "asc",
                  );
                }}
              >
                {currentSortBy === "title" ? (
                  currentSortOrder === "asc" ? (
                    <div className="flex items-center gap-2.5 font-mono text-sm text-black">
                      <ArrowDownAZ size={18} className="shrink-0 text-blue-600" />
                      Title
                      <span className="text-[10px] text-gray-500">
                        (ascending)
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2.5 font-mono text-sm text-black">
                      <ArrowUpAZ size={18} className="shrink-0 text-blue-600" />
                      Title
                      <span className="text-[10px] text-gray-500">
                        (descending)
                      </span>
                    </div>
                  )
                ) : (
                  <div className="flex items-center gap-2.5 font-mono text-sm text-black">
                    <ArrowUpDown size={18} className="shrink-0 text-gray-500" />
                    Title
                  </div>
                )}
              </DropdownMenuItem>

              {/* Created At sort */}
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();

                  onSort(
                    "createdAt",
                    currentSortBy === "createdAt" &&
                      currentSortOrder === "desc"
                      ? "asc"
                      : "desc",
                  );
                }}
              >
                {currentSortBy === "createdAt" ? (
                  currentSortOrder === "asc" ? (
                    <div className="flex items-center gap-2.5 font-mono text-sm text-black">
                      <CalendarArrowUp
                        size={18}
                        className="shrink-0 text-blue-600"
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
                        className="shrink-0 text-blue-600"
                      />
                      Newest
                      <span className="text-[10px] text-gray-500">
                        (descending)
                      </span>
                    </div>
                  )
                ) : (
                  <div className="flex items-center gap-2.5 font-mono text-sm text-black">
                    <Calendar size={18} className="shrink-0 text-gray-500" />
                    Newest
                  </div>
                )}
              </DropdownMenuItem>

              {/* Questions sort */}
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();

                  onSort(
                    "questions",
                    currentSortBy === "questions" &&
                      currentSortOrder === "asc"
                      ? "desc"
                      : "asc",
                  );
                }}
              >
                {currentSortBy === "questions" ? (
                  currentSortOrder === "asc" ? (
                    <div className="flex items-center gap-2.5 font-mono text-sm text-black">
                      <ArrowUp01 size={18} className="shrink-0 text-blue-600" />
                      Questions
                      <span className="text-[10px] text-gray-500">
                        (ascending)
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2.5 font-mono text-sm text-black">
                      <ArrowDown01 size={18} className="shrink-0 text-blue-600" />
                      Questions
                      <span className="text-[10px] text-gray-500">
                        (descending)
                      </span>
                    </div>
                  )
                ) : (
                  <div className="flex items-center gap-2.5 font-mono text-sm text-black">
                    <ArrowUpDown size={18} className="shrink-0 text-gray-500" />
                    Questions
                  </div>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),

      cell: ({ row }: { row: { original: IAdminExam } }) => {
        const exam = row.original;

        return (
          <div className="flex justify-end pe-1 sm:pe-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <button
                  type="button"
                  aria-label={`Actions for ${exam.title}`}
                  className="flex size-8 cursor-pointer items-center justify-center rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 sm:size-9"
                >
                  <MoreHorizontal size={18} />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuItem
                  onClick={() => onView(exam)}
                  className="hover:bg-emerald-50!"
                >
                  <span className="flex items-center gap-2.5 font-mono text-sm text-gray-800">
                    <Eye size={16} className="shrink-0 text-emerald-500" />
                    View
                  </span>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => onEdit(exam)}>
                  <span className="flex items-center gap-2.5 font-mono text-sm text-gray-800">
                    <PenLine size={16} className="shrink-0 text-blue-600" />
                    Edit
                  </span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => onDelete(exam)}
                >
                  <span className="flex items-center gap-2.5 font-mono text-sm text-gray-800">
                    <Trash2 size={16} className="shrink-0 text-red-600" />
                    Delete
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return columns;
}
