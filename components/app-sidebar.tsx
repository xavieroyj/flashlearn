'use client';

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Book, Home, History, Globe2 } from "lucide-react"
import Link from "next/link";
import { usePathname } from "next/navigation";
import CreateQuizDialog from "@/app/dashboard/collection/components/CreateQuizDialog";
import NavUser from "./nav-user";
import { title } from "process";
import Image from "next/image";

const items = [
    {
        title: "Home",
        path: "/dashboard",
        icon: Home
    },
    {
        title: "Collection",
        path: "/dashboard/collection",
        icon: Book
    },
    {
        title: "Explore",
        path: "/dashboard/explore",
        icon: Globe2
    },
    {
        title: "History",
        path: "/dashboard/history",
        icon: History
    },
];

interface AppSidebarProps {
	user: any;
}

export function AppSidebar({ user }: AppSidebarProps) {
	const pathname = usePathname();

	return (
		<Sidebar>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<a href="#">
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
									<Image src="/icon.png" alt="FlashLearn" className="rounded-lg" width={32} height={32} />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">FlashLearn</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>

				<SidebarMenu>
					<SidebarMenuItem>
						<CreateQuizDialog />
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => {
								const isActive = item.path === "/dashboard" 
									? pathname === "/dashboard"
									: pathname.startsWith(item.path);

								return (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton asChild isActive={isActive}>
											<Link href={item.path}>
												<item.icon />
												<span>{item.title}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup />
			</SidebarContent>

			<SidebarFooter>
				<NavUser user={user} />
			</SidebarFooter>
		</Sidebar>
	)
}