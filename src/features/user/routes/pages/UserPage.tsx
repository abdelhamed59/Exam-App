import { Button } from "@/components/ui/button/button";
import useLogout from "@/hooks/logOut";
import Breadcrumb from "@/shared/components/page-header/Breadcrumb";
import PageHeader from "@/shared/components/page-header/page-header";
import { CircleUserRound, Lock, LogOutIcon, UserRound } from "lucide-react";
import { NavLink, Outlet } from "react-router";


const NAV_LINKS = [
  {
    to: "/account",
    label: "Profile",
    icon: CircleUserRound,
  },
  {
    to: "changePassword",
    label: "Change Password",
    icon: Lock,
  },
] as const


export default function UserPage() {
      const { handleLogout } = useLogout();

      const isProfileActive =
    location.pathname === "/account" ;

const isChangePassword =
    location.pathname === "/account/changePassword" ;


  return (<>
    <div className="h-screen flex flex-col">
      {isChangePassword ? <Breadcrumb breadcrumb={["Account","Change Password"]}/>:<Breadcrumb breadcrumb={["Account"]}/>}
    <div className="flex h-full bg-gray-50 flex-col gap-6 p-4 sm:p-6">
    <PageHeader
        icon={UserRound}
        title={"Account Settings" }
        backTo="/"
      />
      <div className="flex flex-col gap-6 lg:h-full lg:flex-row">
        <div className="flex flex-col justify-between gap-4 bg-white p-4 sm:p-6 lg:w-64 lg:shrink-0">
            <nav className="flex flex-col sm:flex-row sm:gap-2 lg:flex-col lg:gap-2.5">
            {NAV_LINKS.map(({ to, label, icon: Icon }) => {
              const isActive =
                label === "Profile"
                  ? isProfileActive
                  : isChangePassword;

              return (
                <NavLink
                  key={to}
                  to={to}
                  className={`flex flex-1 items-center justify-center gap-2.5 px-3 py-2.5 font-mono text-sm font-normal text-gray-500  lg:justify-start lg:text-base ${
                    isActive
                      ? "bg-blue-50 text-blue-600!"
                      : ""
                  }`}
                >
                  <Icon className="size-5 shrink-0 lg:size-6" />
                  {label}
                </NavLink>
              );
            })}
          </nav>
          <Button onClick={handleLogout} className="flex items-center justify-center gap-2.5 px-4 py-2.5 font-mono font-normal bg-red-50 text-red-600 hover:bg-red-100" >
            <LogOutIcon className="size-5 text-red-600 rotate-180 lg:size-6" />
          Logout
          </Button>
        </div>
         <main className="min-w-0 flex-1">
        <Outlet />
      </main>
      </div>

    </div>
    </div>

 </> )
}
