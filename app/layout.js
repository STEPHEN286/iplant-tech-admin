import { Inter } from "next/font/google"
import "./globals.css"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import AppSidebar from "../components/app-sidebar"
import DashboardLayout from "../components/dashboard-layout" // This will now primarily be the header and main content wrapper

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard Overview",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <DashboardLayout>{children}</DashboardLayout>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  )
}
