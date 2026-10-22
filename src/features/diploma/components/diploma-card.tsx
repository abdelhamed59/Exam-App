import { Link } from "react-router";
import type { IDiploma } from "../types/diploma";

interface DiplomaCardProps {
  diploma: IDiploma;
}
export default function DiplomaCard({ diploma }: DiplomaCardProps) {
  return (
    <Link
      to={`/diplomas/${diploma.id}/exams`}
      style={{ backgroundImage: `url(${diploma.image})` }}
      className="relative h-112 overflow-hidden bg-cover bg-center"
    >
      <div className="absolute right-2.5 bottom-2.5 left-2.5 bg-[#155DFCBF] p-4">
        <h3 className="font-mono text-xl font-semibold text-white">{diploma.title}</h3>
        <p className="mt-1 line-clamp-2 h-fit font-mono text-sm font-normal text-white hover:line-clamp-none hover:max-h-70 hover:overflow-auto">
          {diploma.description}  
        </p>
      </div>
    </Link>
  );
}
