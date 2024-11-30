"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ChevronsUpDown, Sparkles, BadgeCheck, CreditCard, Bell, LogOut } from "lucide-react";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from "./ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function NavUser() {
    const { isMobile } = useSidebar()
    const router = useRouter()

    // Get user data using session
    const { 
        data: session, 
        isPending, //loading state
        error //error object
    } = authClient.useSession() 

    if (isPending) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>
    if (!session?.user) {
        throw new Error("Not authenticated")
    }

    const handleSignOut = async () => {
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        console.log("Signed out");
                        // Force a hard navigation to ensure middleware catches it
                        window.location.href = "/login";
                    },
                },
            });
        } catch (error) {
            console.error("Failed to sign out:", error);
        }
    };
    
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="w-full data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={session.user.image || undefined} alt={session.user.name} />
                                <AvatarFallback className="rounded-lg">{session.user.name?.slice(0, 1).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{session.user.name}</span>
                                <span className="truncate text-xs text-muted-foreground">{session.user.email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuItem onClick={handleSignOut} className="gap-2 text-destructive focus:text-destructive">
                            <LogOut className="size-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}