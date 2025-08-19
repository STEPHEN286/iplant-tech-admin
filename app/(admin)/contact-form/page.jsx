"use client"
import SummaryCard from "../../../components/summary-card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ListFilter, MessageSquare, MailWarning, Hourglass, CheckCircle, Reply, RefreshCw } from "lucide-react"
import { useMessages } from "@/hooks/use-messages"

export default function ContactFormsPage() {
  const { messages, totalCount, isLoading, error, refetch } = useMessages()

  const summaryData = [
    { title: "Total Messages", value: totalCount.toString(), change: "", icon: MessageSquare },
    { title: "Unread", value: "-", change: "", icon: MailWarning, iconColor: "text-red-600" },
    { title: "In Progress", value: "-", change: "", icon: Hourglass, iconColor: "text-blue-600" },
    { title: "Resolved", value: "-", change: "", icon: CheckCircle, iconColor: "text-green-600" },
  ]

  const formatDate = (dateString) => new Date(dateString).toLocaleString()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-green-600" />
          <p className="text-gray-600">Loading messages...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading messages</p>
          <Button onClick={refetch} variant="outline">Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">Contact Form Submissions</h2>
          <p className="text-gray-600">Manage customer inquiries and support requests</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <MessageSquare className="h-4 w-4 mr-2" />
          Bulk Reply
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryData.map((data, index) => (
          <SummaryCard key={index} {...data} />
        ))}
      </div>

      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Messages ({totalCount})</h3>
        <div className="flex items-center gap-2 mb-4">
          <Input
            type="search"
            placeholder="Search messages..."
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
              <DropdownMenuItem>Unread</DropdownMenuItem>
              <DropdownMenuItem>In Progress</DropdownMenuItem>
              <DropdownMenuItem>Resolved</DropdownMenuItem>
              <DropdownMenuItem>High Priority</DropdownMenuItem>
              <DropdownMenuItem>Medium Priority</DropdownMenuItem>
              <DropdownMenuItem>Low Priority</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200">
                <TableHead className="text-gray-500">ID</TableHead>
                <TableHead className="text-gray-500">Name</TableHead>
                <TableHead className="text-gray-500">Email</TableHead>
                <TableHead className="text-gray-500">Subject</TableHead>
                <TableHead className="text-gray-500">Message</TableHead>
                <TableHead className="text-gray-500">Created</TableHead>
                <TableHead className="text-gray-500">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((m) => (
                <TableRow key={m.id} className="border-gray-200">
                  <TableCell className="font-medium text-gray-900 truncate max-w-[120px]">{m.id}</TableCell>
                  <TableCell className="text-gray-700 truncate max-w-[160px]">{m.full_name || 'N/A'}</TableCell>
                  <TableCell className="text-gray-700 truncate max-w-[180px]">{m.email}</TableCell>
                  <TableCell className="text-gray-700 truncate max-w-[180px]">{m.subject || 'N/A'}</TableCell>
                  <TableCell className="text-gray-700 truncate max-w-[280px]">{m.message}</TableCell>
                  <TableCell className="text-gray-700 whitespace-nowrap">{formatDate(m.created_at)}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className=" text-gray-700 border-gray-300 hover:bg-gray-200">
                      Reply
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
