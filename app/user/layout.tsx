import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "../(components)/sidebar"
import Navbar from "../(components)/navbar"

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      {/* <Navbar /> */}
      <AppSidebar />
      <main className="p-5 w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
