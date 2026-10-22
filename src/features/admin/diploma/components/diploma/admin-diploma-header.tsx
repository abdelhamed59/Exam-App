import { Button } from "@/components/ui/button/button";
import { useCurrentUser } from "@/features/user/apis/queries/use-current-user";
import { Ban, PenLine, Trash2 } from "lucide-react";
import type { IAdminDiploma } from "../../types/admin-diploma";
import { useNavigate } from "react-router";
import { useState } from "react";
import DeleteDiplomaDialog from "../delete-diploma-dialog";
import { useSetDiplomaImmutable } from "../../apis/mutations/use-set-diploma-immutable";

export default function AdminDiplomaHeader({ diploma }: { diploma: IAdminDiploma }) {
    const { data } = useCurrentUser()
    const navigate = useNavigate()
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const userRole = data?.user.role;
    // make diploma immutable
    const { mutate: setImmutable, isPending: isSettingImmutable } = useSetDiplomaImmutable(diploma.id);
    return (<>
        <div className="py-2 px-4 sm:px-6 bg-white border border-gray-100 flex flex-col md:flex-row items-center  justify-between">
            <p className="font-semibold font-inter text-lg  text-black">{diploma.title}</p>
            <div className="flex items-center  gap-2.5 p-2.5">
                {userRole === "SUPER_ADMIN" && (
                    <Button
                        type="button"
                        isLoading={isSettingImmutable}
                        onClick={() => setImmutable(!diploma.immutable)}
                        className="bg-gray-200 px-4 text-gray-800 hover:bg-gray-300"
                    >
                        <Ban size={18} />
                        {diploma.immutable ? "Mutable" : "Immutable"}
                    </Button>
                )}
                <Button onClick={() => navigate(`/dashboard/diplomas/update/${diploma.id}`)} className="px-4 bg-blue-600 hover:bg-blue-700 text-white">
                    <PenLine size={18} />
                    Edit
                </Button>
                <Button variant="destructive" onClick={() => setShowDeleteDialog(true)} className="px-4 text-white">
                    <Trash2 size={18} />
                    Delete
                </Button>
            </div>
            <DeleteDiplomaDialog
                diploma={showDeleteDialog ? diploma : null}
                onOpenChange={(open) => setShowDeleteDialog(open)}
            />
        </div>



    </>)
}
