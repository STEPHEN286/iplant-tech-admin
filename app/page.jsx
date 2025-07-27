"use client"


import { ShoppingCart, Users2, Package, DollarSign, Clock } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ListFilter } from "lucide-react"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import SummaryCard, { SummaryCardForDashboard } from "@/components/summary-card"

export default function DashboardOverviewPage() {
  const summaryData = [
    { title: "Total Orders", value: "1,247", change: "+12.5%", icon: ShoppingCart, iconColor: "text-blue-500" },
    { title: "Revenue", value: "$84,320", change: "+8.2%", icon: DollarSign, iconColor: "text-green-500" },
    { title: "Active Customers", value: "892", change: "+15.3%", icon: Users2, iconColor: "text-purple-500" },
    { title: "Connected Pods", value: "432", change: "+22.1%", icon: Package, iconColor: "text-green-500" },
    { title: "Inventory", value: "156", change: "-0.2%", icon: Package, iconColor: "text-orange-500" },
    { title: "Waitlist", value: "2,154", change: "+45.0%", icon: Clock, iconColor: "text-purple-500" },
  ]

  const monthlyOrdersData = [
    { name: "Jan", orders: 70 },
    { name: "Feb", orders: 90 },
    { name: "Mar", orders: 80 },
    { name: "Apr", orders: 110 },
    { name: "May", orders: 125 },
    { name: "Jun", orders: 150 },
  ]

  const revenueTrendData = [
    { name: "Jan", revenue: 4000 },
    { name: "Feb", revenue: 5500 },
    { name: "Mar", revenue: 4800 },
    { name: "Apr", revenue: 6500 },
    { name: "May", revenue: 7800 },
    { name: "Jun", revenue: 9500 },
  ]

  const recentOrders = [
    { id: "ORD-001", customer: "Sarah Johnson", product: "Smart Pod v2", amount: "$299", status: "Shipped" },
    { id: "ORD-002", customer: "Mike Chen", product: "Smart Pod v1", amount: "$199", status: "Processing" },
    { id: "ORD-003", customer: "Emily Davis", product: "Smart Pod v2", amount: "$299", status: "Delivered" },
    { id: "ORD-004", customer: "Alex Rodriguez", product: "Smart Pod v2", amount: "$299", status: "Pending" },
  ]

  return (
    <div className="grid gap-6 p-4 md:p-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-600">Welcome back! Here's what's happening with your business today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {summaryData.map((data, index) => (
          <SummaryCardForDashboard key={index} {...data} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Orders</h3>
          <ChartContainer
            config={{
              orders: {
                label: "Orders",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyOrdersData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="orders" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <ChartContainer
            config={{
              revenue: {
                label: "Revenue",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
        <div className="flex items-center gap-2 mb-4">
          <Input
            type="search"
            placeholder="Search orders by customer name or order ID..."
            className="max-w-sm flex-1  text-gray-900 placeholder:text-gray-500 border-gray-300"
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
              <DropdownMenuItem>Shipped</DropdownMenuItem>
              <DropdownMenuItem>Processing</DropdownMenuItem>
              <DropdownMenuItem>Delivered</DropdownMenuItem>
              <DropdownMenuItem>Pending</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200">
                <TableHead className="text-gray-500">Order ID</TableHead>
                <TableHead className="text-gray-500">Customer</TableHead>
                <TableHead className="text-gray-500">Product</TableHead>
                <TableHead className="text-gray-500">Amount</TableHead>
                <TableHead className="text-gray-500">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id} className="border-gray-200">
                  <TableCell className="font-medium text-gray-900">{order.id}</TableCell>
                  <TableCell className="text-gray-700 truncate max-w-[150px]">{order.customer}</TableCell>
                  <TableCell className="text-gray-700 truncate max-w-[150px]">{order.product}</TableCell>
                  <TableCell className="text-gray-700">{order.amount}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === "Shipped"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Processing"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.status === "Delivered"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.status}
                    </span>
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
