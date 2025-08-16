"use client"

import SummaryCard from "../../../components/summary-card"
import { DollarSign, ShoppingCart, Percent, FileDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function ReportsAnalyticsPage() {
  const summaryData = [
    { title: "Total Revenue", value: "$115,700", change: "+12.5% from last period", icon: DollarSign },
    { title: "Total Orders", value: "420", change: "+2.1% from last period", icon: ShoppingCart },
    { title: "Conversion Rate", value: "24.3%", change: "+7.1% from last period", icon: Percent },
    { title: "Avg. Order Value", value: "$275", change: "+3.1% from last period", icon: DollarSign },
  ]

  const revenueOrdersTrendData = [
    { name: "Jan", revenue: 50, orders: 10 },
    { name: "Feb", revenue: 60, orders: 12 },
    { name: "Mar", revenue: 70, orders: 15 },
    { name: "Apr", revenue: 80, orders: 18 },
    { name: "May", revenue: 90, orders: 20 },
    { name: "Jun", revenue: 100, orders: 22 },
  ]

  const salesByRegionData = [
    { name: "North America", value: 45, color: "hsl(var(--chart-1))" },
    { name: "Europe", value: 30, color: "hsl(var(--chart-2))" },
    { name: "Asia", value: 20, color: "hsl(var(--chart-3))" },
    { name: "Others", value: 5, color: "hsl(var(--chart-4))" },
  ]

  const waitlistGrowthData = [
    { name: "Jan", count: 150 },
    { name: "Feb", count: 180 },
    { name: "Mar", count: 220 },
    { name: "Apr", count: 280 },
    { name: "May", count: 350 },
    { name: "Jun", count: 450 },
  ]

  return (
    <div className="grid gap-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
          <p className="text-gray-600">Comprehensive insights into your business performance</p>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200"
              >
                Last 6 Months
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white text-gray-900 border-gray-200">
              <DropdownMenuItem>Last 3 Months</DropdownMenuItem>
              <DropdownMenuItem>Last 6 Months</DropdownMenuItem>
              <DropdownMenuItem>Last 12 Months</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <FileDown className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryData.map((data, index) => (
          <SummaryCard key={index} {...data} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="col-span-2 bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue & Orders Trend</h3>
          <ChartContainer
            config={{
              revenue: {
                label: "Revenue",
                color: "hsl(var(--chart-1))",
              },
              orders: {
                label: "Orders",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueOrdersTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="revenue" fill="hsl(var(--chart-1))" name="Revenue" radius={[4, 4, 0, 0]} />
                <Bar dataKey="orders" fill="hsl(var(--chart-2))" name="Orders" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div className="bg-white col-span-2 rounded-lg p-4 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales By Region</h3>
          <ChartContainer
            config={{
              "North America": {
                label: "North America",
                color: "hsl(var(--chart-1))",
              },
              Europe: {
                label: "Europe",
                color: "hsl(var(--chart-2))",
              },
              Asia: {
                label: "Asia",
                color: "hsl(var(--chart-3))",
              },
              Others: {
                label: "Others",
                color: "hsl(var(--chart-4))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                <Pie
                  data={salesByRegionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={40}    
                  outerRadius={100}  
                  padAngle={4}        
                  startAngle={90}     
                  endAngle={-270}
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {salesByRegionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color}   stroke="#ffffff"      // white stroke for clean slice separation
                    strokeWidth={3}/>
                  ))}
                </Pie>
                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>

      <div className="bg-white w-full rounded-lg p-4 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Waitlist Growth</h3>
        <ChartContainer
          config={{
            count: {
              label: "Waitlist Count",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={waitlistGrowthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="count" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  )
}
