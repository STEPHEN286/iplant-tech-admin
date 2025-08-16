"use client"
import SummaryCard from "../../../components/summary-card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ListFilter, ShoppingCart, Package, TrendingUp, Users, CheckCircle, Clock, AlertCircle } from "lucide-react"

export default function OrdersPage() {
  const summaryData = [
    { title: "Total Orders", value: "2,350", icon: ShoppingCart, iconColor: "text-blue-500", change: "+180.1%", changeColor: "text-blue-600" },
    { title: "Pending Orders", value: "45", icon: Clock, iconColor: "text-yellow-500", change: "+12%", changeColor: "text-yellow-600" },
    { title: "Completed Orders", value: "2,305", icon: CheckCircle, iconColor: "text-green-500", change: "+15%", changeColor: "text-green-600" },
    { title: "Revenue", value: "$45,231", icon: TrendingUp, iconColor: "text-purple-500", change: "+22%", changeColor: "text-purple-600" },
  ]

  const orders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      email: "john.doe@email.com",
      product: "Smart Pod v2",
      amount: "$299",
      status: "Completed",
      orderDate: "2024-01-15",
      shipDate: "2024-01-16",
      tracking: "1Z999AA1234567890",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      email: "jane.smith@email.com",
      product: "Smart Pod v1",
      amount: "$199",
      status: "Processing",
      orderDate: "2024-01-14",
      shipDate: "Pending",
      tracking: "Pending",
    },
    {
      id: "ORD-003",
      customer: "Bob Wilson",
      email: "bob.wilson@email.com",
      product: "Smart Pod v2",
      amount: "$299",
      status: "Shipped",
      orderDate: "2024-01-13",
      shipDate: "2024-01-15",
      tracking: "1Z999AA1234567891",
    },
    {
      id: "ORD-004",
      customer: "Alice Brown",
      email: "alice.brown@email.com",
      product: "Smart Pod v1",
      amount: "$199",
      status: "Completed",
      orderDate: "2024-01-12",
      shipDate: "2024-01-13",
      tracking: "1Z999AA1234567892",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600">Track and manage customer orders</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200">
            <Package className="h-4 w-4 mr-2" />
            Manage Inventory
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Create Order
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {summaryData.map((data, index) => (
          <SummaryCard key={index} {...data} />
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Orders ({orders.length})
            </h2>
            <Button variant="outline" size="sm">
              View All Orders
            </Button>
          </div>
          
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-4">
            <Input
              type="search"
              placeholder="Search by order ID or customer..."
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
                <DropdownMenuItem>Completed</DropdownMenuItem>
                <DropdownMenuItem>Processing</DropdownMenuItem>
                <DropdownMenuItem>Shipped</DropdownMenuItem>
                <DropdownMenuItem>Cancelled</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="overflow-x-auto border-t border-gray-200">
          <div className="min-w-[1200px]">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="border-gray-200 bg-gray-50">
                  <TableHead className="text-gray-500 font-semibold px-4 py-3">Order Details</TableHead>
                  <TableHead className="text-gray-500 font-semibold px-4 py-3">Customer</TableHead>
                  <TableHead className="text-gray-500 font-semibold px-4 py-3">Product</TableHead>
                  <TableHead className="text-gray-500 font-semibold px-4 py-3">Amount</TableHead>
                  <TableHead className="text-gray-500 font-semibold px-4 py-3">Status</TableHead>
                  <TableHead className="text-gray-500 font-semibold px-4 py-3">Dates</TableHead>
                  <TableHead className="text-gray-500 font-semibold px-4 py-3">Tracking</TableHead>
                  <TableHead className="text-gray-500 font-semibold px-4 py-3">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} className="border-gray-200 hover:bg-gray-50">
                    <TableCell className="px-4 py-3">
                      <div>
                        <div className="font-medium text-gray-900">{order.id}</div>
                        <div className="text-sm text-gray-500">Order #{order.id}</div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <div>
                        <div className="font-medium text-gray-900">{order.customer}</div>
                        <div className="text-sm text-gray-500">{order.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700 px-4 py-3">{order.product}</TableCell>
                    <TableCell className="text-gray-700 px-4 py-3 font-medium">{order.amount}</TableCell>
                    <TableCell className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === "Completed" ? "bg-green-100 text-green-700" :
                        order.status === "Processing" ? "bg-yellow-100 text-yellow-700" :
                        order.status === "Shipped" ? "bg-blue-100 text-blue-700" :
                        "bg-gray-100 text-gray-700"
                      }`}>
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <div>
                        <div className="text-sm text-gray-700">Order: {order.orderDate}</div>
                        <div className="text-sm text-gray-500">Ship: {order.shipDate}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700 px-4 py-3 text-sm">{order.tracking}</TableCell>
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
