import { useState } from "react";
import { Plus, SlidersHorizontal, ChevronsDownUp } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import Breadcrumb from "@/shared/components/page-header/Breadcrumb";
import AdminDiplomaTable from "../../components/diplomas/admin-diploma-table";
import type { IAdminDiplomaParams, IAdminDiploma } from "../../types/admin-diploma";
import { useAdminDiplomas } from "../../apis/queries/use-admin-diplomas";
import { useNavigate } from "react-router";
import Pagination from "@/shared/components/pagination/Pagination";
import DiplomaSearchFilters from "../../components/diplomas/admin-diploma-filters";
import DeleteDiplomaDialog from "../../components/delete-diploma-dialog";

export default function AdminDiplomasPage() {
  const [filters, setFilters] = useState<IAdminDiplomaParams>({
    page: 1,
    limit: 12,
    sortBy: "title",
    sortOrder: "asc",
  });
  const navigate = useNavigate();
const [diplomaToDelete, setDiplomaToDelete] = useState<IAdminDiploma | null>(null);

  const [showFilters, setShowFilters] = useState(true);

  const { data, isLoading, isFetching, isError } = useAdminDiplomas(filters);

  const diplomas = data?.data ?? [];
  const metadata = data?.metadata;

  const handleApplyFilters = (values: { search?: string; immutable?: boolean }) => {
    setFilters((prev) => ({ ...prev, ...values, page: 1 }));
  };

  const handleSort = (sortBy: "title" | "createdAt", sortOrder: "asc" | "desc") => {
    setFilters((prev) => ({ ...prev, sortBy, sortOrder }));
  };

  const handleClearFilters = () => {
    setFilters({
      page: 1,
      limit: 12,
      sortBy: "title",
      sortOrder: "asc",
    });
  };

  const handleView = (diploma: IAdminDiploma) => {
  navigate(`/dashboard/diplomas/${diploma.id}`);
  };

  const handleEdit = (diploma: IAdminDiploma) => {
navigate(`/dashboard/diplomas/update/${diploma.id}`)
  };

  const handleDelete = (diploma: IAdminDiploma) => {
      setDiplomaToDelete(diploma);
  };

  if (isLoading) return <div className="p-6 font-mono text-gray-500">Loading...</div>;
  if (isError) return <div className="p-6 font-mono text-red-500">Something went wrong</div>;

  return (
    <div className="flex h-full bg-gray-100 flex-col ">
                    <Breadcrumb breadcrumb={["Diplomas"]} />
      {/* ================= PAGINATION BAR ================= */}
      
<div className="sticky top-0 right-0 left-0 z-50 flex flex-col-reverse md:flex-row items-center justify-between bg-white px-4 py-1.5 sm:px-6">
<Pagination
  page={filters.page}
  limit={filters.limit}
  total={metadata?.total ?? 0}
  totalPages={metadata?.totalPages?? 1}
  onPageChange={(page) =>
    setFilters((prev) => ({
      ...prev,
      page,
    }))
  }
/>
        <Button onClick={()=>navigate("/dashboard/diplomas/create")} className="gap-2.5 ml-auto p-4 bg-emerald-500 font-mono font-medium text-sm text-white hover:bg-emerald-600">
          <Plus size={18} />
          Add New Diploma
        </Button>
      </div>
  
      
<div className=" flex flex-col p-6 gap-6">
  {/* ================= SEARCH & FILTERS ================= */}
      <div className=" bg-white">
        <div className="flex items-center justify-between bg-blue-600 px-2.5">
          <div className="flex items-center gap-1.5 text-white">
            <SlidersHorizontal className="size-5" />
            <h2 className="font-inter text-base font-semibold">Search & Filters</h2>
          </div>
          <Button className="gap-1 hover:bg-transparent font-inter text-sm font-medium text-white"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            {showFilters ? "Hide" : "Show"}
            <ChevronsDownUp className="size-3.5" />
          </Button>
        </div>

        {showFilters && (
          
            <DiplomaSearchFilters onApply={handleApplyFilters} onClear={handleClearFilters} />
          
        )}
      </div>

      {/* ================= TABLE ================= */}
      <AdminDiplomaTable
        data={diplomas}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSort={handleSort}
        currentSortBy={filters.sortBy ?? "createdAt"}
        currentSortOrder={filters.sortOrder ?? "desc"}
      />
</div>
    <DeleteDiplomaDialog
  diploma={diplomaToDelete}
  onOpenChange={(open) => !open && setDiplomaToDelete(null)}
/>

      {isFetching && <div className="text-center font-mono text-sm text-gray-400">Updating...</div>}
    </div>
  );
}
