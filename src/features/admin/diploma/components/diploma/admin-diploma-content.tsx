import type { IAdminDiploma } from "../../types/admin-diploma";
export default function AdminDiplomaContent({ diploma }: { diploma: IAdminDiploma }) {
  return (
    <div className="bg-white p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
            <p className="font-normal font-mono text-sm text-gray-400">Image</p>
            <img src={diploma.image} alt="Diploma" className="size-75 bg-black" />
        </div>
        <div className="flex flex-col gap-1">
            <p className="font-normal font-mono text-sm text-gray-400">Title</p>
            <span className="font-normal font-mono text-sm text-black">{diploma.title}</span>
        </div>
        <div className="flex flex-col gap-1">
            <p className="font-normal font-mono text-sm text-gray-400">Description</p>
            <span className="font-normal font-mono text-sm text-gray-800 leading-[150%]">{diploma.description}</span>
        </div>
    </div>
  )
}
