import SummaryCard from "../../components/summary-card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ListFilter, Download, Users2, Percent, BookOpen, PlusCircle } from "lucide-react"

export default function EBookDownloadsPage() {
  const summaryData = [
    { title: "Total Downloads", value: "590", change: "+45 from last week", icon: Download },
    { title: "Unique Users", value: "512", change: "86.8% unique rate", icon: Users2 },
    { title: "Conversion Rate", value: "10.1%", change: "+2.3% from last month", icon: Percent },
    { title: "Active E-Books", value: "3", change: "Available for download", icon: BookOpen },
  ]

  const eBookPerformance = [
    { title: "Smart Gardening Guide 2024", downloads: 245, percentage: "12.3%" },
    { title: "Indoor Plant Care Basics", downloads: 189, percentage: "9.8%" },
    { title: "Hydroponic Systems Setup", downloads: 156, percentage: "8.2%" },
  ]

  const recentDownloads = [
    { name: "John Smith", eBook: "Smart Gardening Guide 2024", interest: "High" },
    { name: "Maria Garcia", eBook: "Indoor Plant Care Basics", interest: "Medium" },
    { name: "Robert Johnson", eBook: "Smart Gardening Guide 2024", interest: "High" },
  ]

  const downloadHistory = [
    {
      id: "DL001",
      name: "John Smith",
      email: "john.smith@email.com",
      eBook: "Smart Gardening Guide 2024",
      downloadDate: "2024-01-15",
      source: "Landing Page",
      interestLevel: "High",
    },
    {
      id: "DL002",
      name: "Maria Garcia",
      email: "maria.g@email.com",
      eBook: "Indoor Plant Care Basics",
      downloadDate: "2024-01-14",
      source: "Pop-up CTA",
      interestLevel: "Medium",
    },
    {
      id: "DL003",
      name: "Robert Johnson",
      email: "r.johnson@email.com",
      eBook: "Smart Gardening Guide 2024",
      downloadDate: "2024-01-13",
      source: "Email Campaign",
      interestLevel: "High",
    },
    {
      id: "DL004",
      name: "Emily Davis",
      email: "emily.d@email.com",
      eBook: "Hydroponic Systems Setup",
      downloadDate: "2024-01-12",
      source: "Blog Post",
      interestLevel: "Low",
    },
  ]

  return (
    <div className="grid gap-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">E-Book Downloads</h2>
          <p className="text-gray-600">Track e-book downloads and lead generation</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add E-Book
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryData.map((data, index) => (
          <SummaryCard key={index} {...data} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">E-Book Performance</h3>
          <p className="text-gray-600 text-sm mb-4">Download statistics by e-book</p>
          <div className="space-y-4">
            {eBookPerformance.map((book, index) => (
              <div key={index} className="flex items-center border p-2 rounded-md justify-between">
                <div>
                  <div className="font-medium text-gray-900">{book.title}</div>
                  <div className="text-sm text-gray-600">{book.downloads} downloads</div>
                </div>
                <div className="text-sm font-semibold text-gray-700">{book.percentage}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Downloads</h3>
          <p className="text-gray-600 text-sm mb-4">Latest e-book download activity</p>
          <div className="space-y-4">
            {recentDownloads.map((download, index) => (
              <div key={index} className="flex items-center border p-2 rounded-md justify-between">
                <div>
                  <div className="font-medium text-gray-900">{download.name}</div>
                  <div className="text-sm text-gray-600">{download.eBook}</div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    download.interest === "High"
                      ? "bg-black text-white"
                      : download.interest === "Medium"
                        ? "bg-gray-100 text-gray-700"
                        : "bg-gray-100 text-gray-700" 
                  }`}
                >
                  {download.interest}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Download History</h3>
        <p className="text-gray-600 text-sm mb-4">Complete record of e-book downloads</p>
        <div className="flex items-center gap-2 mb-4">
          <Input
            type="search"
            placeholder="Search downloads..."
            className="max-w-sm flex-1  text-gray-900 placeholder:text-gray-500 border-gray-300"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 text-gray-900 border-gray-300 hover:bg-gray-200"
              >
                <ListFilter className="h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white text-gray-900 border-gray-200">
              <DropdownMenuItem>High Interest</DropdownMenuItem>
              <DropdownMenuItem>Medium Interest</DropdownMenuItem>
              <DropdownMenuItem>Low Interest</DropdownMenuItem>
              <DropdownMenuItem>Landing Page</DropdownMenuItem>
              <DropdownMenuItem>Email Campaign</DropdownMenuItem>
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
                <TableHead className="text-gray-500">E-Book</TableHead>
                <TableHead className="text-gray-500">Download Date</TableHead>
                <TableHead className="text-gray-500">Source</TableHead>
                <TableHead className="text-gray-500">Interest Level</TableHead>
                <TableHead className="text-gray-500">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {downloadHistory.map((download) => (
                <TableRow key={download.id} className="border-gray-200">
                  <TableCell className="font-medium text-gray-900">{download.id}</TableCell>
                  <TableCell className="text-gray-700 truncate max-w-[150px]">{download.name}</TableCell>
                  <TableCell className="text-gray-700 truncate max-w-[150px]">{download.email}</TableCell>
                  <TableCell className="text-gray-700 truncate max-w-[200px]">{download.eBook}</TableCell>
                  <TableCell className="text-gray-700">{download.downloadDate}</TableCell>
                  <TableCell className="text-gray-700">{download.source}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        download.interestLevel === "High"
                          ? "bg-black text-white"
                          : download.interestLevel === "Medium"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {download.interestLevel}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className=" text-gray-700 border-gray-300 hover:bg-gray-200"
                    >
                      View
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
