import { Link } from "react-router";
import type { IAdminExam } from "../../types/admin-exam";
import { ExternalLink } from "lucide-react";

export default function AdminExamContent({ exam }: { exam: IAdminExam }) {
  return (
    <div className="bg-white p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
            <p className="font-normal font-mono text-sm text-gray-400">Image</p>
            <img src={exam.image} alt="Diploma" className="size-75" />
        </div>
        <div className="flex flex-col gap-1">
            <p className="font-normal font-mono text-sm text-gray-400">Title</p>
            <span className="font-normal font-mono text-sm text-black">{exam.title}</span>
        </div>
        <div className="flex flex-col gap-1">
            <p className="font-normal font-mono text-sm text-gray-400">Description</p>
            <span className="font-normal font-mono text-sm text-gray-800 leading-[150%]">{exam.description}</span>
        </div>
        <div className="flex flex-col gap-1">
            <p className="font-normal font-mono text-sm text-gray-400">Diploma</p>
            <span className="font-normal font-mono text-sm text-gray-800"><Link className="flex gap-0.5 items-center  underline"  to={`/dashboard/diplomas/${exam.diplomaId}`}>{exam.diploma.title}<ExternalLink size={14}/></Link></span>
        </div>
        <div className="flex flex-col gap-1">
            <p className="font-normal font-mono text-sm text-gray-400">Duration</p>
            <span className="font-normal font-mono text-sm text-gray-800">{exam.duration}</span>
        </div>
        <div className="flex flex-col gap-1">
            <p className="font-normal font-mono text-sm text-gray-400">No. of Questions</p>
            <span className="font-normal font-mono text-sm text-gray-800">{exam.questionsCount}</span>
        </div>
    </div>
  )
}
