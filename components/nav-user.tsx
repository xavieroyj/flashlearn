"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { User } from "better-auth"
import { ChevronsUpDown, Sparkles, BadgeCheck, CreditCard, Bell, LogOut } from "lucide-react"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from "./ui/sidebar"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function NavUser() {
    const { isMobile } = useSidebar()
    const router = useRouter()
    const [session, setSession] = useState<any>(null)

    useEffect(() => {
        authClient.getSession()
            .then(({ data }) => {
                setSession(data)
            })
            .catch(console.error)
    }, [])

    if (!session) return null

    const handleSignOut = () => {
        authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login")
                }
            }
        })
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={session.user.image || undefined} alt={session.user.name} />
                                <AvatarFallback className="rounded-lg">{session.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{session.user.name}</span>
                                <span className="truncate text-xs">{session.user.email}</span>
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
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={session.user.image || undefined} alt={session.user.name} />
                                    <AvatarFallback className="rounded-lg">{session.user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{session.user.name}</span>
                                    <span className="truncate text-xs">{session.user.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <BadgeCheck className="mr-2 h-4 w-4" />
                                Account
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut}>
                            <LogOut className="mr-2 h-4 w-4" />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}