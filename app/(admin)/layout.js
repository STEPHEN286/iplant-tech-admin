import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import AppSidebar from "@/components/app-sidebar"
import DashboardLayout from "@/components/dashboard-layout"
import { AuthGuard } from "@/components/auth-guard"

export default function AdminLayout({ children }) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <DashboardLayout>{children}</DashboardLayout>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  )
}
