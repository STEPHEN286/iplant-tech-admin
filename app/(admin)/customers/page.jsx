"use client"
import SummaryCard from "../../../components/summary-card"

import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {  Users,  Filter, Search } from "lucide-react"
import {  SendNewsletterModal } from "@/components/customer-modal"
import { DataTable } from "@/components/ui/data-table"
import { CustomerColumn } from "@/lib/columns"
import { useGetCustomers } from "@/hooks/useCustomer"

export default function CustomersPage() {

  const { data: customersData, isLoading } =  useGetCustomers()
  const summaryData = [
    { title: "Total Customers", value: "0", icon: Users, iconColor: "text-blue-500", change: "+12%", changeColor: "text-blue-600" },
    { title: "Active Customers", value: "0", icon: Users, iconColor: "text-green-500", change: "+8%", changeColor: "text-green-600" },
    { title: "With Pods", value: "0", icon: Users, iconColor: "text-purple-500", change: "+15%", changeColor: "text-purple-600" },
    { title: "Pending ", value: "0", icon: Users, iconColor: "text-orange-500", change: "+22%", changeColor: "text-orange-600" },
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
          <SendNewsletterModal />
          {/* <AddCustomerModal /> */}
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
            {/* <Button variant="outline" size="sm">
              <FileDown className="h-4 w-4 mr-2" />
              Export CSV
            </Button> */}
          </div>
          
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row    sm:items-center gap-3 mt-4">
           <div className="relative w-full flex-1 sm:w-auto ">
            <Search className="absolute h-4 left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Input
                type="search"
                placeholder="Search  customers..."
                className="  pl-10 text-gray-900 placeholder:text-gray-500 border-gray-300"
              />
           </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 text-gray-900 border-gray-300 hover:bg-gray-200"
                >
                  <Filter className="h-4 w-4" />
                  Filters
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
           <DataTable columns={CustomerColumn({})} data={customersData.results || []} />
          </div>
        </div>
      </div>
    </div>
  )
}
