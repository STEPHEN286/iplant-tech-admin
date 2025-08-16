import SummaryCard from "../../../components/summary-card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ListFilter, PlusCircle, HardDrive, CheckCircle, Users2, Wrench } from "lucide-react"

export default function SmartPodsPage() {
  const summaryData = [
    { title: "Total Pods", value: "127", change: "+12.5% last month", icon: HardDrive, iconColor: "text-gray-500" },
    { title: "Available", value: "34", change: "Ready for assignment", icon: CheckCircle, iconColor: "text-green-500" },
    { title: "Assigned", value: "89", change: "Currently in use", icon: Users2, iconColor: "text-blue-500" },
    { title: "Maintenance", value: "4", change: "Needs attention", icon: Wrench, iconColor: "text-orange-500" },
  ]

  const pods = [
    {
      id: "SP001",
      model: "Smart Pod v2",
      serial: "SP2024001",
      status: "Available",
      batch: "B001",
      dateAdded: "2024-01-15",
      warranty: "Active",
    },
    {
      id: "SP002",
      model: "Smart Pod v2",
      serial: "SP2024002",
      status: "Assigned",
      batch: "B001",
      dateAdded: "2024-01-14",
      warranty: "Active",
    },
    {
      id: "SP003",
      model: "Smart Pod v1",
      serial: "SP2023045",
      status: "Expired",
      batch: "A012",
      dateAdded: "2023-12-20",
      warranty: "Expired",
    },
  ]

  return (
    <div className="grid gap-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">Smart Pods Inventory</h2>
          <p className="text-gray-600">Manage your smart pod inventory and track assignments</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New Pod
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryData.map((data, index) => (
          <SummaryCard key={index} {...data} />
        ))}
      </div>

      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pod Inventory</h3>
        <div className="flex items-center gap-2 mb-4">
          <Input
            type="search"
            placeholder="Search pods..."
            className="max-w-sm flex-1 text-gray-900 placeholder:text-gray-500 border-gray-300"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2  text-gray-900 border-gray-00 hover:bg-gray-200"
              >
                <ListFilter className="h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white text-gray-900 border-gray-200">
              <DropdownMenuItem>Available</DropdownMenuItem>
              <DropdownMenuItem>Assigned</DropdownMenuItem>
              <DropdownMenuItem>Maintenance</DropdownMenuItem>
              <DropdownMenuItem>Expired</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200">
                <TableHead className="text-gray-500">Pod ID</TableHead>
                <TableHead className="text-gray-500">Model</TableHead>
                <TableHead className="text-gray-500">Serial ID</TableHead>
                <TableHead className="text-gray-500">Status</TableHead>
                <TableHead className="text-gray-500">Batch</TableHead>
                <TableHead className="text-gray-500">Date Added</TableHead>
                <TableHead className="text-gray-500">Warranty</TableHead>
                <TableHead className="text-gray-500">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pods.map((pod) => (
                <TableRow key={pod.id} className="border-gray-200">
                  <TableCell className="font-medium text-gray-900">{pod.id}</TableCell>
                  <TableCell className="text-gray-700 truncate max-w-[150px]">{pod.model}</TableCell>
                  <TableCell className="text-gray-700 truncate max-w-[150px]">{pod.serial}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        pod.status === "Available"
                          ? "bg-green-100 text-green-700"
                          : pod.status === "Assigned"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {pod.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-700">{pod.batch}</TableCell>
                  <TableCell className="text-gray-700">{pod.dateAdded}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        pod.warranty === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {pod.warranty}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
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
