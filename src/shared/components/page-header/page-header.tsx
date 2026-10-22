import type { ComponentType } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";

interface PageHeaderProps {
  icon: ComponentType<{ className?: string }>;
  title: string;
  /** shows a back arrow before the icon, navigating here when clicked */
  backTo?: string;
}

export default function PageHeader({ icon: Icon, title, backTo }: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-stretch gap-2.5">
      {backTo && (
        <button
          type="button"
          onClick={() => navigate(backTo)}
          className="flex cursor-pointer items-center border border-blue-600 px-2"
          aria-label="Go back"
        >
          <ChevronLeft className="size-6 text-blue-600" />
        </button>
      )}
      <div className="flex min-w-0 flex-1 items-center gap-3 bg-blue-600 p-4 text-white">
        <Icon className="size-8 shrink-0 sm:size-11.25" />
        <h1 className="min-w-0 truncate font-inter text-lg font-semibold text-white lg:text-[2rem]">
          {title}
        </h1>
      </div>
    </div>
  );
}
