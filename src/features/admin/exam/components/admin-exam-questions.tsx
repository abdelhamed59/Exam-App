import { useState } from "react";


import { useAdminQuestions } from "@/features/admin/question/apis/queries/use-admin-questions";

import AdminQuestionTable from "@/features/admin/exam/components/questions/admin-question-table";

import type { IAdminQuestion } from "@/features/admin/question/types/admin-question";
import { useCurrentUser } from "@/features/user/apis/queries/use-current-user";
import { useNavigate } from "react-router";
import DeleteQuestionDialog from "../../question/components/delete-question-dialog";

interface AdminExamQuestionsProps {
  examId: string;
}

export default function AdminExamQuestions({
  examId,
}: AdminExamQuestionsProps) {
  const [questionSort, setQuestionSort] = useState<{
    sortBy: "title" | "createdAt";
    sortOrder: "asc" | "desc";
  }>({
    sortBy: "title",
    sortOrder: "asc",
  });

      const [questionToDelete, setQuestionToDelete] = useState<IAdminQuestion | null>(null);
  
const navigate=useNavigate()
  const{data}=useCurrentUser()

  const isSuperAdmin =
    data?.user?.role === "SUPER_ADMIN";

  const {
    data: questions,
    isLoading,
    isError,
  } = useAdminQuestions(examId, {
    sortBy: questionSort.sortBy,
    sortOrder: questionSort.sortOrder,
  });
  const handleViewQuestion = (
    question: IAdminQuestion
  ) => {
    navigate(`/dashboard/questions/${question.id}`)
  };

  const handleEditQuestion = (
    question: IAdminQuestion
  ) => {
    navigate(`/dashboard/questions/${question.id}/update`)
  };

  const handleDeleteQuestion = (
    question: IAdminQuestion
  ) => {
    setQuestionToDelete(question)
  };

  const handleQuestionSort = (
    sortBy: "title" | "createdAt",
    sortOrder: "asc" | "desc"
  ) => {
    setQuestionSort({
      sortBy,
      sortOrder,
    });
  };

  return (
    <div className="px-6 pb-6">
      <div className="overflow-hidden rounded-lg bg-white">
        {/* Loading */}
        {isLoading && (
          <div className="flex h-32 items-center justify-center font-mono text-sm text-gray-500">
            Loading questions...
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="flex h-32 items-center justify-center font-mono text-sm text-red-500">
            Failed to load questions.
          </div>
        )}

        {/* Table */}
        {!isLoading && !isError && (
          <AdminQuestionTable
            data={questions ?? []}
            onView={handleViewQuestion}
            onEdit={handleEditQuestion}
            onDelete={handleDeleteQuestion}
            onSort={handleQuestionSort}
            currentSortBy={questionSort.sortBy}
            currentSortOrder={questionSort.sortOrder}
            isSuperAdmin={isSuperAdmin}
          />
        )}
      </div>
       <DeleteQuestionDialog
        question={questionToDelete}
        onOpenChange={(open) => !open && setQuestionToDelete(null)}
      />
    </div>
  );
}