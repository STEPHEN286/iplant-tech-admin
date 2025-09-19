"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
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
  useSidebar,
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
  Tag,
} from "lucide-react"

export default function AppSidebar() {
  const pathname = usePathname()
  const { isMobile, setOpenMobile } = useSidebar();

  const navigationItems = [
    { name: "Dashboard Overview", href: "/", icon: Home },
    { name: "Orders & Customers", href: "/orders", icon: ShoppingCart },
    { name: "Products", href: "/products", icon: Package },
    { name: "Categories", href: "/categories", icon: Tag },
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

  function handleNavClick() {
    if (isMobile) setOpenMobile(false);
  }

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col items-center gap-6 px-6 py-8">
        <Link href="#" className="flex items-center gap-3 font-bold text-xl">
          <Package2 className="h-8 w-8 text-green-500" />
          <span className="text-green-500">iPlant Tech</span>
        </Link>
        <span className="text-base text-gray-500 font-medium">Admin Dashboard</span>
      </SidebarHeader>
      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold text-gray-600 mb-4 px-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link 
                      href={item.href} 
                      onClick={handleNavClick}
                      className="flex items-center gap-4 px-4 py-4 text-base font-medium hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span className="leading-relaxed">{item.name}</span>
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
