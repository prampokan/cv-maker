import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Navbar from "../(components)/navbar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="">{children}</main>;
}
