
import {
  useTable,
  flexRender,
  coreFeatures,
  stockFeatures,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { IAdminExam } from "../../types/admin-exam";
import { getAdminExamColumns } from "./admin-exam-columns";

interface AdminExamTableProps {
  data: IAdminExam[];
  onEdit: (exam: IAdminExam) => void;
  onDelete: (exam: IAdminExam) => void;
  onView: (exam: IAdminExam) => void;
  onSort: (
    sortBy: "title" | "createdAt" | "questions",
    sortOrder: "asc" | "desc",
  ) => void;
  currentSortBy: string;
  currentSortOrder: string;
}

export default function AdminExamTable({
  data,
  onEdit,
  onDelete,
  onView,
  onSort,
  currentSortBy,
  currentSortOrder,
}: AdminExamTableProps) {
  const columns = getAdminExamColumns({
    onView,
    onEdit,
    onDelete,
    onSort,
    currentSortBy,
    currentSortOrder,
  });

  const table = useTable({
    features: {
      ...coreFeatures,
      ...stockFeatures,
    },
    columns,
    data,
  });

  return (
    <div className="w-full min-w-0 overflow-hidden rounded-lg bg-white">
      <div className="w-full overflow-x-auto">
        <Table className="w-full min-w-150 table-fixed sm:min-w-190 lg:min-w-225">
          <colgroup>
            <col className="w-25 sm:w-32.5" />
            <col className="w-55 sm:w-70 lg:w-[320px]" />
            <col className="w-37.5 sm:w-45" />
            <col className="w-30 sm:w-40" />
            <col className="w-22.5 sm:w-27.5" />
          </colgroup>

          {/* Header */}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-none bg-blue-600 hover:bg-blue-600"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-10 overflow-hidden px-2 font-mono text-xs font-medium text-white sm:px-4 sm:text-sm"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          {/* Body */}
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-gray-100"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="overflow-hidden px-2 py-2 sm:px-4 sm:py-2.5"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center font-mono text-sm text-gray-500"
                >
                  No exams found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
