import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  const user = session!.user

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <main className="flex-1 w-full min-h-screen">
        <SidebarTrigger />

        <div className="px-4 py-2">
          {children}
        </div>

      </main>
    </SidebarProvider>
  )
}