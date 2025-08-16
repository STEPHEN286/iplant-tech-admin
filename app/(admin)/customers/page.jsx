"use client"
import SummaryCard from "../../../components/summary-card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ListFilter, UserPlus, UserCheck, Mail, CheckCircle, Send, FileDown, RefreshCw, Users, ShoppingCart, Package, TrendingUp } from "lucide-react"

export default function CustomersPage() {
  const summaryData = [
    { title: "Total Customers", value: "1,234", icon: Users, iconColor: "text-blue-500", change: "+12%", changeColor: "text-blue-600" },
    { title: "Active Customers", value: "987", icon: UserCheck, iconColor: "text-green-500", change: "+8%", changeColor: "text-green-600" },
    { title: "Total Orders", value: "3,456", icon: ShoppingCart, iconColor: "text-purple-500", change: "+15%", changeColor: "text-purple-600" },
    { title: "Revenue", value: "$45,678", icon: TrendingUp, iconColor: "text-orange-500", change: "+22%", changeColor: "text-orange-600" },
  ]

  const customers = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      status: "Active",
      orders: "12",
      totalSpent: "$1,234",
      lastOrder: "2024-01-15",
      source: "Website",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "+1 (555) 234-5678",
      status: "Active",
      orders: "8",
      totalSpent: "$987",
      lastOrder: "2024-01-14",
      source: "Referral",
    },
    {
      id: "3",
      name: "Bob Wilson",
      email: "bob.wilson@email.com",
      phone: "+1 (555) 345-6789",
      status: "Inactive",
      orders: "5",
      totalSpent: "$654",
      lastOrder: "2024-01-10",
      source: "Social Media",
    },
    {
      id: "4",
      name: "Alice Brown",
      email: "alice.brown@email.com",
      phone: "+1 (555) 456-7890",
      status: "Active",
      orders: "15",
      totalSpent: "$2,345",
      lastOrder: "2024-01-16",
      source: "Google Ad",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-gray-600">Manage and analyze your customer base</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200">
            <Send className="h-4 w-4 mr-2" />
            Send Campaign
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {summaryData.map((data, index) => (
          <SummaryCard key={index} {...data} />
        ))}
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Customer List ({customers.length})
            </h2>
            <Button variant="outline" size="sm">
              <FileDown className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
          
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-4">
            <Input
              type="search"
              placeholder="Search by name or email..."
              className="max-w-sm flex-1 text-gray-900 placeholder:text-gray-500 border-gray-300"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 text-gray-900 border-gray-300 hover:bg-gray-200"
                >
                  <ListFilter className="h-4 w-4" />
                  All Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white text-gray-900 border-gray-200">
                <DropdownMenuItem>All Status</DropdownMenuItem>
                <DropdownMenuItem>Active</DropdownMenuItem>
                <DropdownMenuItem>Inactive</DropdownMenuItem>
                <DropdownMenuItem>New</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="overflow-x-auto border-t border-gray-200">
          <div className="min-w-[1200px]">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="border-gray-200 bg-gray-50">
                  <TableHead className="text-gray-500 font-semibold px-4 py-3">Customer</TableHead>
                  <TableHead className="text-gray-500 font-semibold px-4 py-3">Contact</TableHead>
                  <TableHead className="text-gray-500 font-semibold px-4 py-3">Status</TableHead>
                  <TableHead className="text-gray-500 font-semibold px-4 py-3">Orders</TableHead>
                  <TableHead className="text-gray-500 font-semibold px-4 py-3">Total Spent</TableHead>
                  <TableHead className="text-gray-500 font-semibold px-4 py-3">Last Order</TableHead>
                  <TableHead className="text-gray-500 font-semibold px-4 py-3">Source</TableHead>
                  <TableHead className="text-gray-500 font-semibold px-4 py-3">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id} className="border-gray-200 hover:bg-gray-50">
                    <TableCell className="px-4 py-3">
                      <div>
                        <div className="font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">ID: {customer.id}</div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <div>
                        <div className="text-gray-700">{customer.email}</div>
                        <div className="text-sm text-gray-500">{customer.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        customer.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                      }`}>
                        {customer.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-700 px-4 py-3">{customer.orders}</TableCell>
                    <TableCell className="text-gray-700 px-4 py-3 font-medium">{customer.totalSpent}</TableCell>
                    <TableCell className="text-gray-700 px-4 py-3">{customer.lastOrder}</TableCell>
                    <TableCell className="text-gray-700 px-4 py-3">{customer.source}</TableCell>
                    <TableCell className="px-4 py-3">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-gray-700 border-gray-300 hover:bg-gray-200"
                        >
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-600 border-blue-300 hover:bg-blue-50"
                        >
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
