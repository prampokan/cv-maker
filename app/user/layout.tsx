import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "../(components)/sidebar"

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-5">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
