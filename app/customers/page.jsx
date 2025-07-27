import SummaryCard from "../../components/summary-card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ListFilter, Users2, UserCheck, Package, Hourglass, Mail } from "lucide-react"

export default function CustomersPage() {
  const summaryData = [
    { title: "Total Customers", value: "1,234", change: "+180 from last month", icon: Users2 },
    { title: "Active Users", value: "987", change: "79.9% of total", icon: UserCheck, iconColor: "text-green-500" },
    { title: "With Pods", value: "789", change: "63.9% assigned", icon: Package, iconColor: "text-blue-500" },
    { title: "Pending", value: "247", change: "Awaiting setup", icon: Hourglass, iconColor: "text-orange-500" },
  ]

  const customers = [
    {
      id: "C001",
      name: "Sarah Johnson",
      email: "sarahj@email.com",
      joinDate: "2024-01-15",
      orders: 2,
      assignedPod: "SP2024001",
      status: "Active",
    },
    {
      id: "C002",
      name: "Mike Chen",
      email: "mike.chen@email.com",
      joinDate: "2024-01-20",
      orders: 1,
      assignedPod: "SP2024002",
      status: "Active",
    },
    {
      id: "C003",
      name: "Emma Wilson",
      email: "emma.w@email.com",
      joinDate: "2024-02-01",
      orders: 0,
      assignedPod: "None",
      status: "Pending",
    },
    {
      id: "C004",
      name: "David Miller",
      email: "david.m@email.com",
      joinDate: "2024-02-10",
      orders: 3,
      assignedPod: "SP2023045",
      status: "Active",
    },
    {
      id: "C005",
      name: "Olivia Brown",
      email: "olivia.b@email.com",
      joinDate: "2024-02-15",
      orders: 0,
      assignedPod: "None",
      status: "Pending",
    },
  ]

  return (
    <div className="grid gap-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">Customers</h2>
          <p className="text-gray-600">Manage registered users and their pod assignments</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <Mail className="h-4 w-4 mr-2" />
          Send Newsletter
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryData.map((data, index) => (
          <SummaryCard key={index} {...data} />
        ))}
      </div>

      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Directory</h3>
        <div className="flex items-center gap-2 mb-4">
          <Input
            type="search"
            placeholder="Search customers..."
            className="max-w-sm flex-1  text-gray-900 placeholder:text-gray-500 border-gray-300"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2  text-gray-900 border-gray-300 hover:bg-gray-200"
              >
                <ListFilter className="h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white text-gray-900 border-gray-200">
              <DropdownMenuItem>Active</DropdownMenuItem>
              <DropdownMenuItem>Pending</DropdownMenuItem>
              <DropdownMenuItem>With Pods</DropdownMenuItem>
              <DropdownMenuItem>Without Pods</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200">
                <TableHead className="text-gray-500">Customer ID</TableHead>
                <TableHead className="text-gray-500">Name</TableHead>
                <TableHead className="text-gray-500">Email</TableHead>
                <TableHead className="text-gray-500">Join Date</TableHead>
                <TableHead className="text-gray-500">Orders</TableHead>
                <TableHead className="text-gray-500">Assigned Pod</TableHead>
                <TableHead className="text-gray-500">Status</TableHead>
                <TableHead className="text-gray-500">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id} className="border-gray-200">
                  <TableCell className="font-medium text-gray-900">{customer.id}</TableCell>
                  <TableCell>
                    <div className="font-medium text-gray-900 truncate max-w-[150px]">{customer.name}</div>
                  </TableCell>
                  <TableCell className="text-gray-700 truncate max-w-[150px]">{customer.email}</TableCell>
                  <TableCell className="text-gray-700">{customer.joinDate}</TableCell>
                  <TableCell className="text-gray-700">{customer.orders}</TableCell>
                  <TableCell className="text-gray-700">{customer.assignedPod}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        customer.status === "Active" ? "bg-gray-100 text-gray-700" : "bg-black text-white"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className=" text-gray-700 border-gray-300 hover:bg-gray-200"
                    >
                      View Profile
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
