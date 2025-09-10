
import Link from "next/link";
import {
  LayoutGrid,
  Trophy,
  Gift,
  User,
  PanelLeft,
  Search,
  Settings,
  LogOut,
  ChevronDown,
  School,
} from "lucide-react";
import type { User as AuthUser } from "@/app/auth/auth-context";
import { getSession } from "@/app/auth/session";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "./ui/input";
import { signOut } from "@/app/auth/actions";
import { headers } from "next/headers";


const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutGrid },
  { href: "/rewards", label: "Rewards", icon: Gift },
  { href: "/teacher", label: "Teacher Dashboard", icon: School, role: "teacher" },
  { href: "#", label: "Leaderboards", icon: Trophy },
  { href: "#", label: "Profile", icon: User },
];


export function MainLayout({ children }: { children: React.ReactNode }) {
  const user = getSession();
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '/';

  // If we are on an auth page, just render the children.
  if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
    return <main className="flex-1">{children}</main>;
  }

  // Since middleware protects all other pages, we can assume user is not null.
  // We add this check for type safety and as a fallback.
  if (!user) {
    // This case should ideally not be reached due to middleware.
    // You could render a loading state or a fallback UI.
    return null;
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-primary-foreground font-headline text-2xl font-bold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-accent"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <span>Learnify</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => {
               if (item.role && item.role !== user?.role) {
                return null;
              }
              return (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{
                    children: item.label,
                    className: "bg-sidebar-background text-sidebar-foreground",
                  }}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search challenges..." className="pl-9" />
          </div>
          <UserMenu user={user} />
        </header>
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

// UserMenu needs to be a client component because it uses hooks for actions.
function UserMenu({ user }: { user: AuthUser }) {
    
    const handleSignOut = async () => {
        await signOut();
    }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative flex items-center gap-2 p-1 h-10 rounded-full"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.picture} alt={user?.email || 'User'} data-ai-hint="person photo" />
            <AvatarFallback>{user?.email?.[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline-block text-sm">{user?.email}</span>
          <ChevronDown className="h-4 w-4 hidden sm:inline-block text-muted-foreground"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
