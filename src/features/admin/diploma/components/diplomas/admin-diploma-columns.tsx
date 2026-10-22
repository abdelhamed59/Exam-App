
import type { IAdminDiploma } from "../../types/admin-diploma";

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

interface AdminDiplomaColumnsProps {
  onView: (diploma: IAdminDiploma) => void;
  onEdit: (diploma: IAdminDiploma) => void;
  onDelete: (diploma: IAdminDiploma) => void;
  onSort: (
    sortBy: "title" | "createdAt",
    sortOrder: "asc" | "desc",
  ) => void;
  currentSortBy: string;
  currentSortOrder: string;
}

export function getAdminDiplomaColumns({
  onView,
  onEdit,
  onDelete,
  onSort,
  currentSortBy,
  currentSortOrder,
}: AdminDiplomaColumnsProps) {
  const columns = [
    {
      id: "image",
      header: "Image",
      cell: ({ row }: { row: { original: IAdminDiploma } }) => {
        const diploma = row.original;

        return diploma.image ? (
          <img
            src={diploma.image}
            alt={diploma.title}
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
      cell: ({ row }: { row: { original: IAdminDiploma } }) => (
        <div
          className="w-full min-w-0 truncate font-mono text-xs text-gray-800 sm:text-sm"
          title={row.original.title}
        >
          {row.original.title}
        </div>
      ),
    },

    {
      id: "description",
      header: "Description",
      cell: ({ row }: { row: { original: IAdminDiploma } }) => (
        <div className="w-full min-w-0 px-1 py-1 sm:px-2 sm:py-2">
          <p
            className="line-clamp-3 wrap-break-word font-mono text-xs text-gray-500 sm:line-clamp-4 sm:text-sm"
            title={row.original.description}
          >
            {row.original.description}
          </p>
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
                      <ArrowDownAZ
                        size={18}
                        className="shrink-0 text-blue-600"
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
                        className="shrink-0 text-blue-600"
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
                      className="shrink-0 text-gray-500"
                    />
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
                    <Calendar
                      size={18}
                      className="shrink-0 text-gray-500"
                    />
                    Newest
                  </div>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),

      cell: ({ row }: { row: { original: IAdminDiploma } }) => {
        const diploma = row.original;

        return (
          <div className="flex justify-end pe-1 sm:pe-2">
            <DropdownMenu>
              <DropdownMenuTrigger >
                <button
                  type="button"
                  aria-label={`Actions for ${diploma.title}`}
                  className="flex size-8 cursor-pointer items-center justify-center rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 sm:size-9"
                >
                  <MoreHorizontal size={18} />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuItem
                  onClick={() => onView(diploma)}
                  className="hover:bg-emerald-50!"
                >
                  <span className="flex items-center gap-2.5 font-mono text-sm text-gray-800">
                    <Eye
                      size={16}
                      className="shrink-0 text-emerald-500"
                    />
                    View
                  </span>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => onEdit(diploma)}>
                  <span className="flex items-center gap-2.5 font-mono text-sm text-gray-800">
                    <PenLine
                      size={16}
                      className="shrink-0 text-blue-600"
                    />
                    Edit
                  </span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => onDelete(diploma)}
                >
                  <span className="flex items-center gap-2.5 font-mono text-sm text-gray-800">
                    <Trash2
                      size={16}
                      className="shrink-0 text-red-600"
                    />
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
