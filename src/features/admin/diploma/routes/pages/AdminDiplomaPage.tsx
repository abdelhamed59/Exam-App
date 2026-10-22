import { useParams } from "react-router";
import Breadcrumb from "@/shared/components/page-header/Breadcrumb";

import { useAdminDiploma } from "../../apis/queries/use-admin-diploma";
import AdminDiplomaHeader from "../../components/diploma/admin-diploma-header";
import AdminDiplomaContent from "../../components/diploma/admin-diploma-content";

export default function AdminDiplomaPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useAdminDiploma(id!);
 

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
        Diploma not found
      </div>
    );
  }

  return (<>
      <Breadcrumb breadcrumb={["Diplomas", data.title]} />
      <AdminDiplomaHeader diploma={data} />

      <div className="p-6">
        <AdminDiplomaContent diploma={data} />   
      </div>
    </>
  );
}