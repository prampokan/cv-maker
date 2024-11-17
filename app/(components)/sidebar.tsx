import Image from "next/image";
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
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  ChevronsUpDown,
  UserRoundPen,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-auto">
                  <Image
                    src="/shadcn.jpg"
                    alt="shadcn"
                    width={35}
                    height={35}
                    className="rounded-lg"
                  />
                  <div>
                    <h1 className="font-semibold tracking-tight">Prampokan</h1>
                    <p className="text-xs">prampokan@gmail.com</p>
                  </div>
                  <ChevronsUpDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="p-0 min-w-64"
                side="right"
                align="start"
              >
                <DropdownMenuItem className="m-1.5">
                  <Image
                    src="/shadcn.jpg"
                    alt="shadcn"
                    width={35}
                    height={35}
                    className="rounded-lg"
                  />
                  <div>
                    <h1 className="font-semibold tracking-tight">Prampokan</h1>
                    <p className="text-xs">prampokan@gmail.com</p>
                  </div>
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem className="m-1.5">
                  <UserRoundPen />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="m-1.5">
                  <LogOut />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarGroupLabel>CV MAKER INDO</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="cursor-pointer">
                <span>
                  <LayoutDashboard />
                  Dashboard
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
