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
    <div className="grid gap-1 sm:gap-3 w-full ">
      <div className="space-y-1 w-full ">
        <h2 className="text-md sm:text-2xl font-bold text-gray-900  w-fit ">Dashboard Overview</h2>
        <p className="text-xs  text-gray-600  w-fit inline  ">
          Welcome back! Here's what's happening with your business today.
        </p>
      </div>

   
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-3 w-full  overflow-hidden">
          {summaryData.map((data, index) => (
            <SummaryCardForDashboard key={index} {...data} />
          ))}
     
    </div>

      <div className="grid gap-2 sm:gap-6 lg:grid-cols-2 w-full max-w-full">
        <div className="bg-white rounded-lg p-2 sm:p-4 border border-gray-200 w-full max-w-full">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-4">Monthly Orders</h3>
          <div className="overflow-x-auto">
            <ChartContainer
              config={{
                orders: {
                  label: "Orders",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[200px] sm:h-[300px] min-w-[320px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyOrdersData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={10} />
                  <YAxis stroke="#6b7280" fontSize={10} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="orders" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg p-2 sm:p-4 border border-gray-200 w-full max-w-full">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-4">Revenue Trend</h3>
          <div className="overflow-x-auto">
            <ChartContainer
              config={{
                revenue: {
                  label: "Revenue",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[200px] sm:h-[300px] min-w-[320px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueTrendData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={10} />
                  <YAxis stroke="#6b7280" fontSize={10} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="revenue" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-2 sm:p-4 border border-gray-200 w-full max-w-full">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-4">Recent Orders</h3>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3 mb-2 sm:mb-4 w-full max-w-full">
          <Input
            type="search"
            placeholder="Search orders..."
            className="w-full sm:max-w-sm flex-1 text-gray-900 placeholder:text-gray-500 border-gray-300 text-xs sm:text-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 text-gray-900 border-gray-300 hover:bg-gray-200 w-full sm:w-auto text-xs sm:text-sm"
              >
                <ListFilter className="h-4 w-4" />
                <span className="hidden sm:inline">All Status</span>
                <span className="sm:hidden">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white text-gray-900 border-gray-200 w-48">
              <DropdownMenuItem>Shipped</DropdownMenuItem>
              <DropdownMenuItem>Processing</DropdownMenuItem>
              <DropdownMenuItem>Delivered</DropdownMenuItem>
              <DropdownMenuItem>Pending</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="border-gray-200">
              <TableHead className="text-gray-500 text-xs sm:text-sm px-2 sm:px-4 whitespace-nowrap">Order ID</TableHead>
              <TableHead className="text-gray-500 text-xs sm:text-sm px-2 sm:px-4 whitespace-nowrap">Customer</TableHead>
              <TableHead className="text-gray-500 text-xs sm:text-sm px-2 sm:px-4 whitespace-nowrap hidden sm:table-cell">Product</TableHead>
              <TableHead className="text-gray-500 text-xs sm:text-sm px-2 sm:px-4 whitespace-nowrap">Amount</TableHead>
              <TableHead className="text-gray-500 text-xs sm:text-sm px-2 sm:px-4 whitespace-nowrap">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id} className="border-gray-200">
                <TableCell className="font-medium text-gray-900 text-xs sm:text-sm px-2 sm:px-4">{order.id}</TableCell>
                <TableCell className="text-gray-700 text-xs sm:text-sm px-2 sm:px-4">
                  <div>
                    <div className="font-medium">{order.customer}</div>
                    <div className="text-gray-500 sm:hidden">{order.product}</div>
                  </div>
                </TableCell>
                <TableCell className="text-gray-700 text-xs sm:text-sm px-2 sm:px-4 hidden sm:table-cell">{order.product}</TableCell>
                <TableCell className="text-gray-700 text-xs sm:text-sm px-2 sm:px-4">{order.amount}</TableCell>
                <TableCell className="px-2 sm:px-4">
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
              </TableRow>)
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
