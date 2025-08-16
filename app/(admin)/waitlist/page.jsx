"use client"
import SummaryCard, { SummaryCardForWaitlist } from "../../../components/summary-card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ListFilter, UserPlus, UserCheck, Mail, CheckCircle, Send, FileDown, RefreshCw } from "lucide-react"
import {useWaitlist }from "@/hooks/use-waitlist";

export default function WaitlistPage() {
  const { data, isLoading, error, refetch, waitlist, totalCount } = useWaitlist()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-green-600" />
          <p className="text-gray-600">Loading waitlist...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading waitlist: {error.message}</p>
          <Button onClick={refetch} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  const summaryData = [
    { title: "Total Signups", value: totalCount?.toString() || "0", icon: UserPlus, iconColor: "text-blue-500" },
    { title: "Active", value: waitlist?.length?.toString() || "0", icon: UserCheck, iconColor: "text-green-500" },
    { title: "Contacted", value: "0", icon: Mail, iconColor: "text-orange-500" },
    { title: "Converted", value: "0", icon: CheckCircle, iconColor: "text-green-500" },
  ]

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Waitlist Management</h1>
          <p className="text-gray-600">Track and manage potential customers</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200">
            <Send className="h-4 w-4 mr-2" />
            Send Campaign
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <FileDown className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {summaryData.map((data, index) => (
          <SummaryCardForWaitlist key={index} {...data} />
        ))}
      </div>

      {/* Waitlist Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Waitlist Members ({totalCount || 0})
            </h2>
            <Button onClick={refetch} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
          
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-4">
            <Input
              type="search"
              placeholder="Search by email..."
              className="max-w-sm flex-1 text-gray-900 placeholder:text-gray-500 border-gray-300"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 text-gray-900 border-gray-300 hover:bg-gray-200"
                >
                  <ListFilter className="h-4 w-4" />
                  All Sources
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white text-gray-900 border-gray-200">
                <DropdownMenuItem>All Sources</DropdownMenuItem>
                <DropdownMenuItem>Website</DropdownMenuItem>
                <DropdownMenuItem>Social Media</DropdownMenuItem>
                <DropdownMenuItem>Referral</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Table with Horizontal Scroll */}
        <div className="overflow-x-auto border-t border-gray-200">
          <div className="min-w-[1200px]">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="border-gray-200 bg-gray-50">
                  <TableHead className="text-gray-500 font-semibold px-4 py-3 min-w-[120px]">Name</TableHead>
                  <TableHead className="text-gray-500 font-semibold px-4 py-3 min-w-[200px]">Email</TableHead>
                  <TableHead className="text-gray-500 font-semibold px-4 py-3 min-w-[120px]">Source</TableHead>
                  <TableHead className="text-gray-500 font-semibold px-4 py-3 min-w-[150px]">Joined Date</TableHead>
                  <TableHead className="text-gray-500 font-semibold px-4 py-3 min-w-[100px]">Status</TableHead>
                  <TableHead className="text-gray-500 font-semibold px-4 py-3 min-w-[120px]">Follow-up</TableHead>
                  <TableHead className="text-gray-500 font-semibold px-4 py-3 min-w-[180px]">Interests</TableHead>
                  <TableHead className="text-gray-500 font-semibold px-4 py-3 min-w-[150px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {waitlist && waitlist.length > 0 ? (
                  waitlist.map((member) => (
                    <TableRow key={member.id} className="border-gray-200 hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-900 px-4 py-3">N/A</TableCell>
                      <TableCell className="text-gray-700 px-4 py-3">{member.email}</TableCell>
                      <TableCell className="text-gray-700 px-4 py-3">N/A</TableCell>
                      <TableCell className="text-gray-700 px-4 py-3">{formatDate(member.joined_at)}</TableCell>
                      <TableCell className="px-4 py-3">
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                          Active
                        </span>
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                          N/A
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-700 px-4 py-3">N/A</TableCell>
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
                            className="text-red-600 border-red-300 hover:bg-red-50"
                          >
                            Remove
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12 text-gray-500">
                      <Mail className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg">No one has joined the waitlist yet.</p>
                      <p className="text-sm text-gray-400 mt-1">When people join, they'll appear here</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
