import { Link, useParams } from "react-router";
import { useAdminQuestion } from "../../apis/queries/use-admin-question";
import Breadcrumb from "@/shared/components/page-header/Breadcrumb";
import AdminQuestionHeader from "../../components/admin-question-header";
import { ExternalLink } from "lucide-react";

export default function AdminQuestionView() {
   const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useAdminQuestion(id!);



 
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
        Question not found
      </div>
    );
  }
  return (
    <div>
      <Breadcrumb breadcrumb={["Exams",`${data.exam.title}`,"Question",`${data.text}`]}/>
      <AdminQuestionHeader question={data}/>
      <div className="p-6">
        <div className="p-4 bg-white flex flex-col gap-4">
           <div className="flex flex-col gap-1">
            <p className="font-normal font-mono text-sm text-gray-400">Headline</p>
            <span className="font-normal font-mono text-sm text-black">{data.text}</span>
        </div>
         <div className="flex flex-col gap-1">
            <p className="font-normal font-mono text-sm text-gray-400">Exam</p>
            <span className="font-normal font-mono text-sm text-gray-800"><Link className="flex gap-0.5 items-center  underline"  to={`/dashboard/exams/${data.examId}`}>{data.exam.title}<ExternalLink size={14}/></Link></span>
        </div>
         <div className="flex flex-col gap-1">
            <p className="font-normal font-mono text-sm text-gray-400">Answers</p>
            <span className="font-normal font-mono text-sm text-black">{data.answers.length}</span>
        </div>
        </div>
      </div>
    </div>
  )
}
