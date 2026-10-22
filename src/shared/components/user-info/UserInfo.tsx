import { EllipsisVertical, UserIcon, LogOutIcon, Bolt } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/features/user/apis/queries/use-current-user";
import useLogout from "@/hooks/logOut";
import { useLocation, useNavigate } from "react-router";
interface colorProps {
  textColor?: string;
}

export default function UserInfo({ textColor }: colorProps) {
  const { data } = useCurrentUser();
  const user = data?.user;
  const { handleLogout } = useLogout();
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div className="flex items-center justify-between gap-2.5">
      {user?.profilePhoto ? (
        <img src={user.profilePhoto} alt="yourImage" className="size-13.5" />
      ) : (
        <p className="flex size-10 items-center justify-center rounded-full border bg-gray-200 p-3 text-2xl font-semibold text-gray-600">
          {user?.firstName?.[0]}
        </p>
      )}
      <div className="info">
        <span className={`font-mono font-medium ${textColor || "text-blue-600"}`}>
          {user?.firstName} {user?.lastName}
        </span>
        <p className="font-mono text-xs font-normal text-gray-500">{user?.email}</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical className={`size-4.5 ${textColor || "text-gray-500"}`} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => navigate("/account")}>
            <UserIcon className="size-4.5 text-gray-400" />
            Account
          </DropdownMenuItem>
          {(user?.role === "ADMIN" || user?.role === "SUPER_ADMIN") && (
            <DropdownMenuItem onClick={() => (isAdminDashboard ? navigate("/") : navigate("/dashboard/diplomas"))}>
              <Bolt className="size-4.5 text-gray-400" />
              {isAdminDashboard ? "Application" : "Dashboard"}
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} variant="destructive">
            <LogOutIcon className="size-4.5 rotate-180 text-red-400" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
