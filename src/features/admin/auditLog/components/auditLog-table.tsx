
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
import type { IAuditLog } from "../types/auditLog";
import { getAuditLogColumns } from "./auditLogs-columns";

interface AuditlogTableProps {
  data: IAuditLog[];
  onDelete: (log: IAuditLog) => void;
  onView: (log: IAuditLog) => void;
  onSort: (
    sortBy: "action" | "user" | "entity" | "createdAt",
    sortOrder: "asc" | "desc"
  ) => void;
  currentSortBy: string;
  currentSortOrder: string;
  userRole: string;
}

export default function AuditlogTable({
  data,
  onDelete,
  onView,
  onSort,
  currentSortBy,
  currentSortOrder,
  userRole,
}: AuditlogTableProps) {
  const columns = getAuditLogColumns({
    onView,
    onDelete,
    onSort,
    currentSortBy,
    currentSortOrder,
    userRole,
  });

  const table = useTable({
    features: { ...coreFeatures, ...stockFeatures },
    columns,
    data,
  });

  return (
    <div className="w-full min-w-0 overflow-hidden rounded-lg bg-white">
      <div className="w-full overflow-x-auto">
        <Table className="w-full min-w-175 table-fixed sm:min-w-225 lg:min-w-250">
          <colgroup>
            <col className="w-32.5 sm:w-40" />
            <col className="w-45 sm:w-55" />
            <col className="w-50 sm:w-65" />
            <col className="w-37.5 sm:w-47.5" />
            <col className="w-17.5 sm:w-17.5" />
          </colgroup>

          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-none bg-blue-600 hover:bg-blue-600"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-9 whitespace-nowrap px-2 text-xs font-medium text-white sm:px-3 sm:text-sm"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

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
                      className="overflow-hidden px-2 py-2.5 align-top sm:px-3"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
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
                  No audit logs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
