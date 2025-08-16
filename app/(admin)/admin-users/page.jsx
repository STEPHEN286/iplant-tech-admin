import SummaryCard from "../../../components/summary-card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { UserPlus, UserCheck, UserX, MoreHorizontal } from "lucide-react"

export default function AdminUsersPage() {
  const summaryData = [
    { title: "Total Admins", value: "4", change: "Total admin accounts", icon: UserPlus },
    { title: "Active Users", value: "3", change: "Currently active", icon: UserCheck, iconColor: "text-green-600" , valueColor: "text-green-600" },
    { title: "Super Admins", value: "1", change: "Full access users", icon: UserX, iconColor: "text-red-600" , valueColor: "text-red-600" },
  ]

  const adminUsers = [
    {
      name: "John Smith",
      email: "john.smith@iplanttech.com",
      role: "Super Admin",
      status: "Active",
      lastLogin: "2024-01-15 14:30",
    },
    {
      name: "Mike Chen",
      email: "mike@iplanttech.com",
      role: "Tech Support",
      status: "Active",
      lastLogin: "2024-01-13 16:45",
    },
    {
      name: "Lisa Williams",
      email: "lisa.w@iplanttech.com",
      role: "Logistics",
      status: "Inactive",
      lastLogin: "2023-12-28 11:20",
    },
    {
      name: "Sarah Johnson",
      email: "sarah.j@iplanttech.com",
      role: "Marketing Manager",
      status: "Active",
      lastLogin: "2024-01-14 09:15",
    },
  ]

  const recentActivity = [
    { user: "John Smith", activity: "Updated product settings", date: "2024-01-15 14:30" },
    { user: "Sarah Johnson", activity: "Exported waitlist data", date: "2024-01-14 09:15" },
    { user: "Mike Chen", activity: "Responded to contact form", date: "2024-01-13 16:45" },
    { user: "John Smith", activity: "Added new admin user", date: "2024-01-12 10:20" },
  ]

  return (
    <div className="grid gap-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">Admin Users</h2>
          <p className="text-gray-600">Manage admin users and their permissions</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Admin User
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {summaryData.map((data, index) => (
          <SummaryCard key={index} {...data} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="bg-white rounded-lg col-span-2 p-4 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Users</h3>
          <div className="flex items-center gap-2 mb-4">
            <Input
              type="search"
              placeholder="Search users..."
              className="max-w-sm flex-1 bg-gray-100 text-gray-900 placeholder:text-gray-500 border-gray-300"
            />
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200">
                  <TableHead className="text-gray-500">Name</TableHead>
                  <TableHead className="text-gray-500">Role</TableHead>
                  <TableHead className="text-gray-500">Status</TableHead>
                  <TableHead className="text-gray-500">Last Login</TableHead>
                  <TableHead className="text-gray-500">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {adminUsers.map((user, index) => (
                  <TableRow key={index} className="border-gray-200">
                    <TableCell className="font-medium text-gray-900 truncate max-w-[150px]">{user.name}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === "Super Admin"
                            ? "bg-red-100 text-red-700"
                            : user.role === "Tech Support"
                              ? "bg-blue-100 text-blue-700"
                              : user.role === "Logistics"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-700">{user.lastLogin}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white text-gray-900 border-gray-200">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Deactivate</DropdownMenuItem>
                          <DropdownMenuItem>Reset Password</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex flex-col">
                <div className="font-medium text-gray-900">{activity.user}</div>
                <div className="text-sm text-gray-600">{activity.activity}</div>
                <div className="text-xs text-gray-500">{activity.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
