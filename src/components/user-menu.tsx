
'use client';

import {
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import type { User as AuthUser } from "@/app/auth/session";

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
import { signOut } from "@/app/auth/actions";

export function UserMenu({ user }: { user: AuthUser }) {
    
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
        <form action={signOut}>
            <button type="submit" className="w-full">
                <DropdownMenuItem>
                    <LogOut className="mr-2" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
