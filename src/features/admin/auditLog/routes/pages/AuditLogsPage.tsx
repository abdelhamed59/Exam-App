import Breadcrumb from "@/shared/components/page-header/Breadcrumb";
import type { IAuditLog, IAuditLogsParams } from "../../types/auditLog";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAdminAuditLogs } from "../../apis/queries/use-auditLogs";
import Pagination from "@/shared/components/pagination/Pagination";
import { Button } from "@/components/ui/button/button";
import { ChevronsDownUp, Shredder, SlidersHorizontal } from "lucide-react";
import AuditLogFilters from "../../components/AuditLogFilters";
import AuditlogTable from "../../components/auditLog-table";
import { useCurrentUser } from "@/features/user/apis/queries/use-current-user";
import DeleteAuditLogDialog from "../../components/delete-auditLog-dialog";

export default function AuditLogsPage() {
  const [filters, setFilters] = useState<IAuditLogsParams>({
    page: 1,
    limit: 20,
    sortOrder: "desc",
    sortBy: "createdAt",
  });
  const [selectedAuditLog, setSelectedAuditLog] = useState<IAuditLog | null>(null);

  const [clearAllOpen, setClearAllOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  const { data: user } = useCurrentUser();
  const userRole = user?.user.role;

  const navigate = useNavigate();
  const { data, isLoading, isFetching, isError } = useAdminAuditLogs(filters);
  const auditLogs = data?.data ?? [];
  const metadata = data?.metadata;

  const handleApplyFilters = (values: {
    category?: "DIPLOMA" | "EXAM" | "QUESTION" | "USER" | "SYSTEM";
    action?: "CREATE" | "UPDATE" | "DELETE" | "SET_IMMUTABLE" | "SEED_DATA";
    actorUserId?: string;
  }) => {
    setFilters((prev) => ({ ...prev, ...values, page: 1 }));
  };

  const handleClearFilters = () => {
    setFilters({
      page: 1,
      limit: 20,
      sortBy: "createdAt",
      sortOrder: "asc",
    });
  };

  const handleSort = (sortBy: "action" | "user" | "entity" | "createdAt", sortOrder: "asc" | "desc") => {
    setFilters((prev) => ({ ...prev, sortBy, sortOrder }));
  };

  const handleView = (log: IAuditLog) => {
    navigate(`/dashboard/auditLogs/${log.id}`);
  };

  const handleDelete = (log: IAuditLog) => {
    setSelectedAuditLog(log);
  };

  if (isLoading) return <div className="p-6 font-mono text-gray-500">Loading...</div>;
  if (isError) return <div className="p-6 font-mono text-red-500">Something went wrong</div>;
  return (
    <div>
      <Breadcrumb breadcrumb={["Audit Logs"]} />
      {/* ================= PAGINATION BAR ================= */}

      <div className="sticky top-0 right-0 left-0 z-50 flex items-center justify-between bg-white px-4 py-1.5 sm:px-6">
        <Pagination
          page={filters.page}
          limit={filters.limit}
          total={metadata?.total ?? 0}
          totalPages={metadata?.totalPages ?? 1}
          onPageChange={(page) =>
            setFilters((prev) => ({
              ...prev,
              page,
            }))
          }
        />
        {userRole === "SUPER_ADMIN" && (
          <Button onClick={() => setClearAllOpen(true)} variant={"destructive"}>
            <Shredder />
            Clear All Logs
          </Button>
        )}
      </div>
      {/* audit logs table */}
      <div className="flex flex-col gap-6 p-6">
        {/* ================= SEARCH & FILTERS ================= */}
        <div className="bg-white">
          <div className="flex items-center justify-between bg-blue-600 px-2.5">
            <div className="flex items-center gap-1.5 text-white">
              <SlidersHorizontal className="size-5" />
              <h2 className="font-inter text-base font-semibold">Search & Filters</h2>
            </div>
            <Button
              className="font-inter gap-1 text-sm font-medium text-white hover:bg-transparent"
              onClick={() => setShowFilters((prev) => !prev)}
            >
              {showFilters ? "Hide" : "Show"}
              <ChevronsDownUp className="size-3.5" />
            </Button>
          </div>

          {showFilters && <AuditLogFilters onApply={handleApplyFilters} onClear={handleClearFilters} />}
        </div>

        {/* ================= TABLE ================= */}
        <AuditlogTable
          data={auditLogs}
          onView={handleView}
          onDelete={handleDelete}
          onSort={handleSort}
          currentSortBy={filters.sortBy ?? "createdAt"}
          currentSortOrder={filters.sortOrder ?? "desc"}
          userRole={userRole ?? ""}
        />
      </div>
      {/* Delete one audit log */}
      <DeleteAuditLogDialog
        open={!!selectedAuditLog}
        mode="single"
        auditLog={selectedAuditLog}
        onOpenChange={(open) => {
          if (!open) setSelectedAuditLog(null);
        }}
      />

      {/* Clear all audit logs */}
      <DeleteAuditLogDialog open={clearAllOpen} mode="all" onOpenChange={setClearAllOpen} />

      {isFetching && <div className="text-center font-mono text-sm text-gray-400">Updating...</div>}
    </div>
  );
}
