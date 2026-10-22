import { Button } from "@/components/ui/button/button";
import { useCurrentUser } from "@/features/user/apis/queries/use-current-user";
import { Ban, ExternalLink, PenLine, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router";
import type { IAdminQuestion } from "../types/admin-question";
import DeleteQuestionDialog from "./delete-question-dialog";
import { useState } from "react";
import { useSetQuestionImmutable } from "../apis/mutations/use-set-question-immutable";

export default function AdminQuestionHeader({ question }: { question: IAdminQuestion }) {
    const { data } = useCurrentUser()
    const navigate = useNavigate()
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const userRole = data?.user.role;
        // make question immutable
        const { mutate: setImmutable, isPending: isSettingImmutable } = useSetQuestionImmutable(question.id);
     const canModify = !question.immutable || userRole === "SUPER_ADMIN";
    return (<>
        <div className="py-2 px-4 sm:px-6 bg-white border border-gray-100 flex flex-col md:flex-row items-center justify-between">
            <div>
                <p className="font-semibold font-inter text-lg  text-black">{question.text}</p>
                <p className=" font-inter flex gap-1 items-center  text-gray-400 text-sm">Exam: <Link className="flex gap-0.5 items-center  underline" to={`/dashboard/exams/${question.examId}`}>{question.exam.title}<ExternalLink size={14} /></Link></p>

            </div>
            <div className="flex items-center gap-2.5 p-2.5">
                 {userRole === "SUPER_ADMIN" && (
                    <Button
                        type="button"
                        isLoading={isSettingImmutable}
                        onClick={() => setImmutable(!question.immutable)}
                        className="bg-gray-200 px-4 text-gray-800 hover:bg-gray-300"
                    >
                        <Ban size={18} />
                        {question.immutable ? "Mutable" : "Immutable"}
                    </Button>
                )}
                {canModify && (<><Button onClick={() => navigate(`/dashboard/questions/${question.id}/update`)} className="px-4 bg-blue-600 hover:bg-blue-700 text-white">
                    <PenLine size={18} />
                    Edit
                </Button>
                <Button variant="destructive" onClick={() => setShowDeleteDialog(true)} className="px-4 text-white">
                    <Trash2 size={18} />
                    Delete
                </Button></>)}
            </div>
            <DeleteQuestionDialog
                question={showDeleteDialog ? question : null}
                onOpenChange={(open) => setShowDeleteDialog(open)}
                onDeleted={() => {
                    navigate(`/dashboard/exams/${question?.examId}`);
                }}
            />
        </div>



    </>)
}
