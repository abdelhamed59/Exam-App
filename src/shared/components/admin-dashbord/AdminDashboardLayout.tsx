import { Link, Outlet, useLocation } from "react-router";
import finalLogo from "@/assets/finalLogo.svg";
import Logo from "../logo/Logo";
import { GraduationCap, UserRound, Menu, X, BookOpenCheck, Logs } from "lucide-react";
import UserInfo from "../user-info/UserInfo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";

const NAV_LINKS = [
  {
    to: "/dashboard/diplomas",
    label: "Diplomas",
    icon: GraduationCap,
  },
  {
    to: "/dashboard/exams",
    label: "Exams",
    icon: BookOpenCheck,
  },
  {
    to: "/account",
    label: "Account Settings",
    icon: UserRound,
  },
  {
    to: "/dashboard/auditLogs",
    label: "Audit Logs",
    icon: Logs,
  },
] as const;

// Lives inside <SidebarProvider> so it can read the sidebar context.
function MobileTopBar() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-100 bg-gray-800 px-4 sm:px-6 md:hidden">
      <img src={finalLogo} alt="Logo" className="h-auto w-28 brightness-400" />
      <button
        type="button"
        onClick={toggleSidebar}
        aria-label="Open menu"
        className="cursor-pointer rounded-lg border border-gray-600 p-2 text-white transition-colors hover:bg-gray-100 hover:text-gray-800"
      >
        <Menu className="size-6" />
      </button>
    </header>
  );
}

function MobileCloseButton() {
  const { setOpenMobile } = useSidebar();

  return (
    <button
      type="button"
      onClick={() => setOpenMobile(false)}
      aria-label="Close menu"
      className="absolute top-4 right-4 cursor-pointer rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-blue-100 md:hidden"
    >
      <X className="size-5" />
    </button>
  );
}

export default function AdminDashboardLayout() {
  const location = useLocation();

   const isLinkActive = (to: string) => {
    if (to === "/account") {
      return location.pathname === "/account";
    }
    return (
      location.pathname === to ||
      location.pathname.startsWith(`${to}/`)
    );
  };

  return (
    <SidebarProvider className="bg-gray-800">
      {/* Desktop: fixed sidebar / Mobile (<md): slide-in sheet */}
      <Sidebar collapsible="offcanvas" className="bg-gray-800 h-full">
        <SidebarHeader className="relative p-6 pt-8">
          <div className="flex flex-col items-start gap-3 pr-8 md:gap-2.5 md:pr-0">
            <img src={finalLogo} alt="Logo" className="h-auto w-28 brightness-400 sm:w-32 xl:w-36.5" />
            <Logo textColor="text-white" />
          </div>
          <MobileCloseButton />
        </SidebarHeader>

        <SidebarContent className="p-6">
          <SidebarMenu className="gap-2.5">
            {NAV_LINKS.map(({ to, label, icon: Icon }) => {
                const isActive = isLinkActive(to);

              return (
                <SidebarMenuItem key={to}>
                  <SidebarMenuButton
                    render={<Link to={to} />}
                    isActive={isActive}
                    tooltip={label}
                    className="justify-start p-4 font-mono text-base font-normal text-white hover:bg-gray-700 hover:text-white data-active:border data-active:border-gray-500 data-active:bg-gray-700 data-active:text-white"
                  >
                    <Icon className="size-6 shrink-0 xl:size-6" />
                    <span className="truncate">{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>

        {/* User info (logout lives here) */}
        <SidebarFooter className="pb-8">
          <UserInfo textColor="text-white" />
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <MobileTopBar />

        <main className="h-full min-w-0 flex-1 overflow-x-hidden">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
