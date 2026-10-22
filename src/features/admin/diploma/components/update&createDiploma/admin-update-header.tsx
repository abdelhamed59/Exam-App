import { Button } from "@/components/ui/button/button";
import { Save, X } from "lucide-react";

interface updateDiplomaProps {
  isSaving?: boolean;
  title?:string;
    onCancel: () => void;
}

export const ADMIN_DIPLOMA_FORM_ID = "admin-diploma-form";

export default function UpdateDiplomaHeader({isSaving,title,onCancel}:updateDiplomaProps) {
  return (
<div className="py-1.5 px-6 bg-white border border-gray-100 flex items-center justify-between">
    <p className="font-semibold font-inter text-lg  text-black">{title}</p>
    <div className="flex items-center gap-2.5 p-2.5">
        <Button onClick={onCancel} variant={"secondary"} className="px-4">
                <X size={18} />
                Cancel
            </Button>
            <Button type="submit" form={ADMIN_DIPLOMA_FORM_ID} isLoading={isSaving} className="px-4 bg-emerald-500 hover:bg-emerald-600 text-white">
                <Save size={18} />
                save
            </Button>
    </div>
  </div>
  )
}
