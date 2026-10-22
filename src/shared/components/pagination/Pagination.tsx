import { Button } from "@/components/ui/button/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  limit,
  total,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center gap-4 py-2.5">
      <span className="font-mono text-sm text-gray-800">
        {total > 0
          ? `${(page - 1) * limit + 1} - ${Math.min(
              page * limit,
              total
            )} of ${total}`
          : "0 of 0"}
      </span>

      <div className="flex items-center justify-center border border-gray-300">
        <Button
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="flex size-10 items-center justify-center border border-gray-300 border-e-0 bg-gray-200 text-gray-800 hover:bg-gray-200 disabled:text-gray-400"
        >
          <ChevronLeft size={16} />
        </Button>

        <span className="px-4 font-mono text-sm text-gray-400">
          Page {page} of {totalPages}
        </span>

        <Button
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="flex size-10 items-center justify-center border border-gray-300 border-s-0 bg-gray-200 text-gray-800 hover:bg-gray-200 disabled:text-gray-400"
        >
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}