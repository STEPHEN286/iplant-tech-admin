"use client"
import { Button } from "@/components/ui/button"
import { Bell, Search, User } from "lucide-react" 
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar" 
import { useLogout, useMe } from "@/hooks/use-auth"
// import { useAuth } from "@/hooks/useAuth"

export default function DashboardLayout({ children }) {
  // const { user, logout, isLogoutLoading } = useAuth()
 const { data: user } = useMe();

// console.log("ME:", user);

  const {mutate: logout, isPending: isLogoutLoading} = useLogout()

  const handleLogout = async () => {
   logout()
  }

  return (
    <div className="flex min-h-screen  w-full  flex-col bg-background text-foreground  ">
      <header className="sticky top-0 z-30 flex h-14 sm:h-16 items-center justify-between gap-2 sm:gap-4 border-b border-gray-200 py-2 sm:py-4 px-3 sm:px-4 md:px-6 bg-white w-full max-w-full">
        {/* Use SidebarTrigger directly. It handles mobile sheet and desktop toggle internally. */}
        <div className="flex items-center gap-2 sm:gap-3 w-full max-w-full">
          <SidebarTrigger className="-ml-1" />

          <h1 className="font-semibold text-base sm:text-lg text-gray-900 truncate">Admin Dashboard</h1>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 sm:h-9 sm:w-9">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 sm:h-9 sm:w-9">
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white text-gray-700  w-48">
              <DropdownMenuItem className="text-sm">
                {user?.email || "User"}
              </DropdownMenuItem>
              <DropdownMenuItem>My Account</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleLogout}
                disabled={isLogoutLoading}
                className="text-red-400 hover:text-red-300"
              >
                {isLogoutLoading ? "Logging out..." : "Logout"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="w-full overflow-x-hidden px-4 sm:px-6 md:px-8">
  <div className=" mx-auto w-full py-4">
  {children}
  </div>
</main>
    </div>
  )
}
