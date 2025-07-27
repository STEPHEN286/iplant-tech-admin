"use client"
import { Button } from "@/components/ui/button"
import { Bell, Search, User } from "lucide-react" // PanelLeft is now handled by SidebarTrigger
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar" // Only SidebarTrigger is needed here

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 flex h-16 items-center  justify-between gap-4 border-b border-gray-200 py-4 px-4 sm:static sm:h-auto sm:bg-transparent sm:px-6">
        {/* Use SidebarTrigger directly. It handles mobile sheet and desktop toggle internally. */}
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
  
          <h1 className="font-semibold text-lg text-gray-900">Admin Dashboard</h1>
        </div>
        {/* <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-gray-800 pl-8 md:w-[200px] lg:w-[336px] text-gray-50 placeholder:text-gray-400 border-gray-700"
          />
        </div> */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5 text-gray-400" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-800 text-gray-50 border-gray-700">
              <DropdownMenuItem>My Account</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 bg-gray-100">{children}</main>
    </div>
  )
}
