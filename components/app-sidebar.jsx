"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  Package2,
  Home,
  ShoppingCart,
  Package,
  ClipboardList,
  Mail,
  BookOpen,
  LineChart,
  HardDrive,
  Settings,
  UserCog,
  Users,
} from "lucide-react"

export default function AppSidebar() {
  // const [activePath, setActivePath] = useState("/dashboard")
  const pathname = usePathname()

  const navigationItems = [
    { name: "Dashboard Overview", href: "/", icon: Home },
    { name: "Orders & Customers", href: "/orders", icon: ShoppingCart },
    { name: "Smart Pods", href: "/smart-pods", icon: Package },
    { name: "Customers", href: "/customers", icon: Users },
    { name: "Waitlist", href: "/waitlist", icon: ClipboardList },
    { name: "Contact Forms", href: "/contact-form", icon: Mail },
    { name: "E-Book Downloads", href: "/ebooks", icon: BookOpen },
    { name: "Reports & Analytics", href: "/reports", icon: LineChart },
    { name: "Inventory", href: "/inventory", icon: HardDrive },
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Admin Users", href: "/admin-users", icon: UserCog },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col items-center gap-4 px-4 py-6">
        <Link href="#" className="flex items-center gap-2 font-semibold text-lg">
          <Package2 className="h-6 w-6 text-green-500" />
          <span className="text-green-500">iPlant Tech</span>
        </Link>
        <span className="text-sm text-gray-400">Admin Dashboard</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
