import { Button } from "@/components/ui/button/button";
import { ExternalLink, Save, X } from "lucide-react";
import { Link } from "react-router";

interface updateDiplomaProps {
    isSaving?: boolean;
    title?: string;
    diploma?: {
        id: string,
        title: string
    }
    onCancel: () => void;
}

export const ADMIN_EXAM_FORM_ID = "admin-exam-form";

export default function UpdateAndCreateExamHeader({ isSaving, diploma, title, onCancel }: updateDiplomaProps) {
    return (
        <div className="py-1.5 px-6 bg-white border border-gray-100 flex flex-col md:flex-row items-center justify-between">
            <div>
                <p className="font-semibold font-inter text-lg  text-black">{title}</p>
                {diploma ?
                 <p className=" font-inter flex gap-1 items-center  text-gray-400 text-sm">Diploma: <Link className="flex gap-0.5 items-center  underline" to={`/dashboard/diplomas/${diploma?.id}`}>{diploma?.title}<ExternalLink size={14} /></Link></p>
                    : null}
            </div>
            <div className="flex  items-center  gap-2.5 p-2.5">
                <Button onClick={onCancel} variant={"secondary"} className="px-4">
                    <X size={18} />
                    Cancel
                </Button>
                <Button type="submit" form={ADMIN_EXAM_FORM_ID} isLoading={isSaving} className="px-4 bg-emerald-500 hover:bg-emerald-600 text-white">
                    <Save size={18} />
                    save
                </Button>
            </div>
        </div>
    )
}
