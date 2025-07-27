import SummaryCard, { SummaryCardForWaitlist } from "../../components/summary-card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ListFilter, UserPlus, UserCheck, Mail, CheckCircle, Send, FileDown } from "lucide-react"

export default function WaitlistPage() {
  const summaryData = [
    { title: "Total Signups", value: "4",  icon: UserPlus, iconColor: "text-blue-500" },
    { title: "Active", value: "2", icon: UserCheck, iconColor: "text-green-500" },
    { title: "Contacted", value: "1", icon: Mail, iconColor: "text-orange-500" },
    { title: "Converted", value: "1", icon: CheckCircle, iconColor: "text-green-500" },
  ]

  const waitlistMembers = [
    {
      name: "John Doe",
      email: "john.doe@email.com",
      source: "Pop-up",
      joinedDate: "2024-01-15",
      status: "Active",
      followUp: "Pending",
      interests: "Smart Pod v2, Automation",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@email.com",
      source: "Facebook Ad",
      joinedDate: "2024-01-14",
      status: "Contacted",
      followUp: "Sent",
      interests: "Smart Pod v1, Beginner",
    },
    {
      name: "Bob Wilson",
      email: "bob.wilson@email.com",
      source: "Referral",
      joinedDate: "2024-01-13",
      status: "Converted",
      followUp: "Sent",
      interests: "Smart Pod v2, Advanced",
    },
    {
      name: "Alice Brown",
      email: "alice.brown@email.com",
      source: "Google Ad",
      joinedDate: "2024-01-12",
      status: "Active",
      followUp: "Pending",
      interests: "Smart Pod v1",
    },
  ]

  return (
    <div className="grid gap-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">Waitlist Management</h2>
          <p className="text-gray-600">Track and manage potential customers</p>
        </div>
        <div className="flex gap-2">
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryData.map((data, index) => (
          <SummaryCardForWaitlist key={index} {...data} />
        ))}
      </div>

      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Waitlist Members ({waitlistMembers.length})</h3>
        <div className="flex items-center gap-2 mb-4">
          <Input
            type="search"
            placeholder="Search by name or email..."
            className="max-w-sm flex-1  text-gray-900 placeholder:text-gray-500 border-gray-300"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 
                 text-gray-900 border-gray-300 hover:bg-gray-200"
              >
                <ListFilter className="h-4 w-4" />
                All Sources
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white text-gray-900 border-gray-200">
              <DropdownMenuItem>Pop-up</DropdownMenuItem>
              <DropdownMenuItem>Facebook Ad</DropdownMenuItem>
              <DropdownMenuItem>Referral</DropdownMenuItem>
              <DropdownMenuItem>Google Ad</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200">
                <TableHead className="text-gray-500">Name</TableHead>
                <TableHead className="text-gray-500">Email</TableHead>
                <TableHead className="text-gray-500">Source</TableHead>
                <TableHead className="text-gray-500">Joined Date</TableHead>
                <TableHead className="text-gray-500">Status</TableHead>
                <TableHead className="text-gray-500">Follow-up</TableHead>
                <TableHead className="text-gray-500">Interests</TableHead>
                <TableHead className="text-gray-500">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {waitlistMembers.map((member, index) => (
                <TableRow key={index} className="border-gray-200">
                  <TableCell className="font-medium text-gray-900 truncate max-w-[150px]">{member.name}</TableCell>
                  <TableCell className="text-gray-700 truncate max-w-[150px]">{member.email}</TableCell>
                  <TableCell className="text-gray-700">{member.source}</TableCell>
                  <TableCell className="text-gray-700">{member.joinedDate}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        member.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : member.status === "Contacted"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {member.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        member.followUp === "Pending" ? "bg-gray-100 text-gray-700" : "bg-green-100 text-green-700"
                      }`}
                    >
                      {member.followUp}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-700 truncate max-w-[200px]">{member.interests}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className=" text-gray-700 border-gray-300 hover:bg-gray-200"
                    >
                      Edit
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
