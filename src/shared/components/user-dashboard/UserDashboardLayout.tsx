import { Link, Outlet, useLocation } from "react-router";
import finalLogo from "@/assets/finalLogo.svg";
import Logo from "../logo/Logo";
import { GraduationCap, UserRound, Menu, X } from "lucide-react";
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
    to: "/",
    label: "Diplomas",
    icon: GraduationCap,
  },
  {
    to: "/account",
    label: "Account Settings",
    icon: UserRound,
  },
] as const;

// Lives inside <SidebarProvider> so it can read the sidebar context.
function MobileTopBar() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-blue-100 bg-blue-50 px-4 sm:px-6 md:hidden">
      <img src={finalLogo} alt="Logo" className="h-auto w-28" />
      <button
        type="button"
        onClick={toggleSidebar}
        aria-label="Open menu"
        className="cursor-pointer rounded-lg border border-blue-600 p-2 text-blue-600 transition-colors hover:bg-blue-100"
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

export default function UserDashboardLayout() {
  const location = useLocation();

  const isDiplomasActive =
    location.pathname === "/" ||
    location.pathname.startsWith("/diplomas") ||
    location.pathname.startsWith("/questions") ||
    location.pathname.startsWith("/submissions");

  const isAccountActive = location.pathname.startsWith("/account");

  return (
    <SidebarProvider className="bg-blue-50">
      {/* Desktop: fixed sidebar / Mobile (<md): slide-in sheet */}
      <Sidebar collapsible="offcanvas">
        <SidebarHeader className="relative  p-6  pt-8">
          <div className="flex  gap-3 pr-8 flex-col items-start md:gap-2.5 md:pr-0">
            <img
              src={finalLogo}
              alt="Logo"
              className="h-auto w-28 sm:w-32 xl:w-36.5"
            />
            <Logo />
          </div>
          <MobileCloseButton />
        </SidebarHeader>

        <SidebarContent className="p-6">
          <SidebarMenu className="gap-2.5">
            {NAV_LINKS.map(({ to, label, icon: Icon }) => {
              const isActive =
                label === "Diplomas" ? isDiplomasActive : isAccountActive;

              return (
                <SidebarMenuItem key={to}>
                  <SidebarMenuButton
                    render={<Link to={to} />}
                    isActive={isActive}
                    tooltip={label}
                    className="justify-start  px-4 py-4 font-mono text-sm font-normal data-active:border data-active:border-blue-500"
                  >
                    <Icon className="size-5 shrink-0 xl:size-6" />
                    <span className="truncate">{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>

        {/* User info (logout lives here) */}
        <SidebarFooter className="pb-8">
          <UserInfo />
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <MobileTopBar />

        <main className="min-w-0 h-full flex-1 overflow-x-hidden">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
