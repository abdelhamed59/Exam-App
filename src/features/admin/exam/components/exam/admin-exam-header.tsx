import { Button } from "@/components/ui/button/button";
import { useCurrentUser } from "@/features/user/apis/queries/use-current-user";
import { Ban, ExternalLink, PenLine, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import type { IAdminExam } from "../../types/admin-exam";
import DeleteExamDialog from "../delete-exam-dialog";
import { useSetExamImmutable } from "../../apis/mutations/use-set-exam-immutable";

export default function AdminExamHeader({ exam }: { exam: IAdminExam }) {
    const { data } = useCurrentUser()
    const navigate = useNavigate()
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const userRole = data?.user.role;
        // make exam immutable
        const { mutate: setImmutable, isPending: isSettingImmutable } = useSetExamImmutable(exam.id);
    return (<>
        <div className="py-2 px-4 sm:px-6 bg-white border border-gray-100 flex flex-col md:flex-row items-center justify-between">
            <div>
                <p className="font-semibold font-inter text-lg  text-black">{exam.title}</p>
                <p className=" font-inter flex gap-1 items-center  text-gray-400 text-sm">Diploma: <Link className="flex gap-0.5 items-center  underline"  to={`/dashboard/diplomas/${exam.diplomaId}`}>{exam.diploma.title}<ExternalLink size={14}/></Link></p>

            </div>
            <div className="flex items-center gap-2.5 p-2.5">
                  {userRole === "SUPER_ADMIN" && (
                    <Button
                        type="button"
                        isLoading={isSettingImmutable}
                        onClick={() => setImmutable(!exam.immutable)}
                        className="bg-gray-200 px-4 text-gray-800 hover:bg-gray-300"
                    >
                        <Ban size={18} />
                        {exam.immutable ? "Mutable" : "Immutable"}
                    </Button>
                )}
                <Button onClick={() => navigate(`/dashboard/exams/update/${exam.id}`)} className="px-4 bg-blue-600 hover:bg-blue-700 text-white">
                    <PenLine size={18} />
                    Edit
                </Button>
                <Button variant="destructive" onClick={() => setShowDeleteDialog(true)} className="px-4 text-white">
                    <Trash2 size={18} />
                    Delete
                </Button>
            </div>
            <DeleteExamDialog
                exam={showDeleteDialog ? exam : null}
                onOpenChange={(open) => setShowDeleteDialog(open)}
            />
        </div>



    </>)
}
