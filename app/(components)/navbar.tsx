import { SidebarTrigger } from "@/components/ui/sidebar"

export default function Navbar() {
    return (
        <nav className="w-full flex justify-center items-center h-14 border-b bg-white fixed">
            <div className="w-[70rem]">
                {/* <SidebarTrigger /> */}
                <h1 className="font-semibold tracking-tight text-zinc-800">LOGO</h1>
            </div>
        </nav>
    )
}