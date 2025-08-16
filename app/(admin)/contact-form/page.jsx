import SummaryCard from "../../../components/summary-card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ListFilter, MessageSquare, MailWarning, Hourglass, CheckCircle, Reply } from "lucide-react"

export default function ContactFormsPage() {
  const summaryData = [
    { title: "Total Messages", value: "456", change: "+23 from last week", icon: MessageSquare },
    { title: "Unread", value: "12", change: "Needs attention", icon: MailWarning, iconColor: "text-red-600" },
    { title: "In Progress", value: "8", change: "Being handled", icon: Hourglass, iconColor: "text-blue-600" },
    { title: "Resolved", value: "436", change: "39.8% resolved", icon: CheckCircle, iconColor: "text-green-600" },
  ]

  const contactMessages = [
    {
      id: "CT001",
      name: "Alex Turner",
      email: "alex.turner@email.com",
      subject: "Product Inquiry - Smart Pod v2",
      category: "Product Inquiry",
      date: "2024-01-15",
      status: "Unread",
      priority: "Medium",
    },
    {
      id: "CT002",
      name: "Lisa Park",
      email: "lisa.park@email.com",
      subject: "Technical Support Request",
      category: "Support",
      date: "2024-01-14",
      status: "Resolved",
      priority: "High",
    },
    {
      id: "CT003",
      name: "David Miller",
      email: "d.miller@email.com",
      subject: "Feedback on App Experience",
      category: "Feedback",
      date: "2024-01-13",
      status: "In Progress",
      priority: "Low",
    },
    {
      id: "CT004",
      name: "Sophia Lee",
      email: "sophia.l@email.com",
      subject: "Partnership Opportunity",
      category: "Business",
      date: "2024-01-12",
      status: "Unread",
      priority: "High",
    },
    {
      id: "CT005",
      name: "James White",
      email: "james.w@email.com",
      subject: "Billing Question",
      category: "Billing",
      date: "2024-01-11",
      status: "Resolved",
      priority: "Medium",
    },
  ]

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
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Messages</h3>
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
                <TableHead className="text-gray-500">Category</TableHead>
                <TableHead className="text-gray-500">Date</TableHead>
                <TableHead className="text-gray-500">Status</TableHead>
                <TableHead className="text-gray-500">Priority</TableHead>
                <TableHead className="text-gray-500">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contactMessages.map((message) => (
                <TableRow key={message.id} className="border-gray-200">
                  <TableCell className="font-medium text-gray-900">{message.id}</TableCell>
                  <TableCell className="text-gray-700 truncate max-w-[150px]">{message.name}</TableCell>
                  <TableCell className="text-gray-700 truncate max-w-[150px]">{message.email}</TableCell>
                  <TableCell className="text-gray-700 truncate max-w-[200px]">{message.subject}</TableCell>
                  <TableCell className="text-gray-700">{message.category}</TableCell>
                  <TableCell className="text-gray-700">{message.date}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        message.status === "Unread"
                          ? "bg-red-600 text-white"
                          : message.status === "In Progress"
                            ? "bg-black text-white"
                            : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {message.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        message.priority === "High"
                          ? "bg-red-600 text-white"
                          : message.priority === "Medium"
                            ? "bg-black text-white"
                            : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {message.priority}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className=" text-gray-700 border-gray-300 hover:bg-gray-200"
                    >
                      {/* <Reply className="h-4 w-4 mr-1" /> */}
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
