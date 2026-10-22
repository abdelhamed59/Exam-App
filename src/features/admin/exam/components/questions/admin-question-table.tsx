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

import type { IAdminQuestion } from "@/features/admin/question/types/admin-question";

import { getAdminQuestionColumns } from "./admin-question-columns";

interface AdminQuestionTableProps {
  data: IAdminQuestion[];

  onEdit: (question: IAdminQuestion) => void;

  onDelete: (question: IAdminQuestion) => void;

  onView: (question: IAdminQuestion) => void;

  onSort: (
    sortBy: "title" | "createdAt",
    sortOrder: "asc" | "desc"
  ) => void;

  currentSortBy: string;

  currentSortOrder: string;

  isSuperAdmin: boolean;
}

export default function AdminQuestionTable({
  data,
  onEdit,
  onDelete,
  onView,
  onSort,
  currentSortBy,
  currentSortOrder,
  isSuperAdmin,
}: AdminQuestionTableProps) {
  const columns = getAdminQuestionColumns({
    onView,
    onEdit,
    onDelete,
    onSort,
    currentSortBy,
    currentSortOrder,
    isSuperAdmin,
  });

  const table = useTable({
    features: {
      ...coreFeatures,
      ...stockFeatures,
    },

    columns,

    data,
  });

 
// return (
//   <div className="w-full min-w-0 overflow-hidden rounded-lg bg-white">
//     <div className="w-full overflow-x-auto">
//       <Table className="w-full min-w-[320px] table-fixed sm:min-w-[480px]">
//         <colgroup>
//           <col className="w-[75%] sm:w-[80%]" />
//           <col className="w-[25%] sm:w-[20%]" />
//         </colgroup>

//         {/* Header */}
//         <TableHeader>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <TableRow
//               key={headerGroup.id}
//               className="border-none bg-gray-200 hover:bg-gray-200"
//             >
//               {headerGroup.headers.map((header) => (
//                 <TableHead
//                   key={header.id}
//                   className="h-9 overflow-hidden px-2 font-mono text-xs font-medium text-black sm:px-4 sm:text-sm"
//                 >
//                   {header.isPlaceholder
//                     ? null
//                     : flexRender(
//                         header.column.columnDef.header,
//                         header.getContext(),
//                       )}
//                 </TableHead>
//               ))}
//             </TableRow>
//           ))}
//         </TableHeader>

//         {/* Body */}
//         <TableBody>
//           {table.getRowModel().rows.length ? (
//             table.getRowModel().rows.map((row) => (
//               <TableRow
//                 key={row.id}
//                 className="border-b border-gray-100"
//               >
//                 {row.getVisibleCells().map((cell) => (
//                   <TableCell
//                     key={cell.id}
//                     className="overflow-hidden px-2 py-2 sm:px-4 sm:py-2.5"
//                   >
//                     {flexRender(
//                       cell.column.columnDef.cell,
//                       cell.getContext(),
//                     )}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell
//                 colSpan={columns.length}
//                 className="h-32 text-center font-mono text-sm text-gray-500"
//               >
//                 No questions found.
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   </div>
// );

return (
  <div className="w-full min-w-0 overflow-hidden rounded-lg bg-white">
    <div className="w-full overflow-x-auto">
      <Table className="w-full min-w-[320px] table-fixed sm:min-w-120">
        <colgroup>
          <col className="w-[75%] sm:w-[80%]" />
          <col className="w-[25%] sm:w-[20%]" />
        </colgroup>

        {/* Header */}
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-none bg-gray-200 hover:bg-gray-200"
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="h-9 overflow-hidden px-2 font-mono text-xs font-medium text-black sm:px-4 sm:text-sm"
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
                No questions found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  </div>
);

}