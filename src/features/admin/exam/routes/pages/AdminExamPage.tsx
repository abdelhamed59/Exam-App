import Breadcrumb from "@/shared/components/page-header/Breadcrumb";
import AdminExamHeader from "../../components/exam/admin-exam-header";
import { useAdminExam } from "../../apis/queries/use-admin-exam";
import { useNavigate, useParams } from "react-router";
import AdminExamContent from "../../components/exam/admin-exam-content";
import AdminExamQuestions from "../../components/admin-exam-questions";
import { Button } from "@/components/ui/button/button";
import { Plus } from "lucide-react";

export default function AdminExamPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useAdminExam(id!)
  const navigate=useNavigate()
  if (isLoading) {
    return (
      <div className="p-6 font-mono text-gray-500">
        Loading...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-6 font-mono text-red-500">
        exam not found
      </div>
    );
  }
  return (
    <div>
      <Breadcrumb breadcrumb={["exams", `${data.title}`]} />
      {/* exam header */}
      <AdminExamHeader exam={data} />
      {/* exam content */}
      <div className="p-6">
        <AdminExamContent exam={data} />
      </div>

      
      {/* Exam Questions */}
      <div className="px-6">
        <div className="flex items-center justify-between bg-blue-600 px-2.5">
          <h2 className="font-inter text-base font-semibold text-white">
            Exam Questions
          </h2>

          <Button
            type="button"
            className="gap-2 font-mono text-base font-medium text-white"
            onClick={() => {
              navigate(`/dashboard/questions/exam/${id}/create`)
            }}
          >
            <Plus size={18} />

            Add Question
          </Button>
        </div>
      </div>
      <AdminExamQuestions
        examId={data.id}
      />
    </div>
  )
}