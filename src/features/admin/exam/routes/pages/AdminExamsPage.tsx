import Breadcrumb from "@/shared/components/page-header/Breadcrumb";
import type { IAdminExam, IAdminExamParams } from "../../types/admin-exam";
import { useState } from "react";
import { useAdminExams } from "../../apis/queries/use-admin-exams";
import { Button } from "@/components/ui/button/button";
import { ChevronsDownUp, Plus, SlidersHorizontal } from "lucide-react";
import Pagination from "@/shared/components/pagination/Pagination";
import ExamSearchFilters from "../../components/exams/admin-exams-filters";
import AdminExamTable from "../../components/exams/admin-exam-table";
import { useNavigate } from "react-router";
import DeleteExamDialog from "../../components/delete-exam-dialog";

export default function AdminExamsPage() {
  const [filters, setFilters] = useState<IAdminExamParams>({
      page: 1,
      limit: 12,
      sortBy: "title",
      sortOrder: "asc",
      diplomaId:undefined
    });
    const navigate=useNavigate()
    const [examToDelete, setExamToDelete] = useState<IAdminExam | null>(null);
    
      const [showFilters, setShowFilters] = useState(true);
      const { data, isLoading, isFetching, isError } = useAdminExams(filters);
    const exams = data?.data ?? [];
  const metadata = data?.metadata;



   const handleApplyFilters = (values: { search?: string; immutable?: boolean;diplomaId?:string }) => {
      setFilters((prev) => ({ ...prev, ...values, page: 1 }));
    };
  
    const handleSort = (sortBy: "title" | "createdAt" |"questions", sortOrder: "asc" | "desc") => {
      setFilters((prev) => ({ ...prev, sortBy, sortOrder }));
    };
  
    const handleClearFilters = () => {
      setFilters({
        page: 1,
        limit: 12,
        sortBy: "title",
        sortOrder: "asc",
        diplomaId:undefined,
      });
    };
  
    const handleView = (exam: IAdminExam) => {
    navigate(`/dashboard/exams/${exam.id}`);
    };
  
    const handleEdit = (exam: IAdminExam) => {
  navigate(`/dashboard/exams/update/${exam.id}`)
    };
  
    const handleDelete = (exam: IAdminExam) => {
setExamToDelete(exam)      
    };
  
    if (isLoading) return <div className="p-6 font-mono text-gray-500">Loading...</div>;
    if (isError) return <div className="p-6 font-mono text-red-500">Something went wrong</div>;
  
  return (
    <div>
      <Breadcrumb breadcrumb={["Exams"]}/>
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
        <Button onClick={()=>navigate("/dashboard/exams/create")} className="gap-2.5 p-4 ml-auto bg-emerald-500 font-mono font-medium text-sm text-white hover:bg-emerald-600">
          <Plus size={18} />
          Add New Exam
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
          <ExamSearchFilters
  onApply={handleApplyFilters}
  onClear={handleClearFilters}
/>
          
        )}
      </div>

      {/* ================= TABLE ================= */}
      <AdminExamTable
        data={exams}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSort={handleSort}
        currentSortBy={filters.sortBy ?? "createdAt"}
        currentSortOrder={filters.sortOrder ?? "desc"}
      />
</div>
 <DeleteExamDialog
  exam={examToDelete}
  onOpenChange={(open) => !open && setExamToDelete(null)}
/>
      {isFetching && <div className="text-center font-mono text-sm text-gray-400">Updating...</div>}

    </div>
  )
}
