import SummaryCard from "../../../components/summary-card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ListFilter, PlusCircle, HardDrive, AlertTriangle, ShieldCheck, Pencil, Package, CheckCheckIcon, CheckCircle } from "lucide-react"

export default function InventoryPage() {
  const summaryData = [
    { title: "Total Stock", value: "76", change: "Units in inventory", icon: HardDrive  },
    { title: "Low Stock", value: "1", change: "Items needing restocking", icon: AlertTriangle, valueColor: "text-yellow-500"  , iconColor: "text-yellow-500" },
    { title: "Out of Stock", value: "1", change: "Items unavailable", icon: Package, valueColor: "text-red-500" , iconColor: "text-red-500" },
    { title: "Active Warranties", value: "68", change: "Valid warranties", icon: CheckCircle, valueColor: "text-green-500" , iconColor: "text-green-500" },
  ]

  const inventoryItems = [
    {
      model: "Smart Pod v2.1",
      serial: "SP21-2024-001",
      status: "In Stock",
      quantity: 45,
      batch: "B2024-03",
      dateAdded: "2024-03-15",
      warranty: "Active",
    },
    {
      model: "Smart Pod v2.0",
      serial: "SP20-2024-002",
      status: "Low Stock",
      quantity: 8,
      batch: "B2024-02",
      dateAdded: "2024-02-28",
      warranty: "Active",
    },
    {
      model: "Smart Pod v1.5",
      serial: "SP15-2023-003",
      status: "Out of Stock",
      quantity: 0,
      batch: "B2023-12",
      dateAdded: "2023-12-10",
      warranty: "Expired",
    },
    {
      model: "Smart Pod Pro",
      serial: "SPP-2024-004",
      status: "In Stock",
      quantity: 23,
      batch: "B2024-04",
      dateAdded: "2024-04-02",
      warranty: "Active",
    },
  ]

  return (
    <div className="grid gap-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
          <p className="text-gray-600">Track and manage your Smart Pod Inventory</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New Stock
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryData.map((data, index) => (
          <SummaryCard key={index} {...data} />
        ))}
      </div>

      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Inventory Items</h3>
        <div className="flex items-center gap-2 mb-4">
          <Input
            type="search"
            placeholder="Search by model, serial number, or batch..."
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
              <DropdownMenuItem>In Stock</DropdownMenuItem>
              <DropdownMenuItem>Low Stock</DropdownMenuItem>
              <DropdownMenuItem>Out of Stock</DropdownMenuItem>
              <DropdownMenuItem>Active Warranty</DropdownMenuItem>
              <DropdownMenuItem>Expired Warranty</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200">
                <TableHead className="text-gray-500">Model</TableHead>
                <TableHead className="text-gray-500">Serial Number</TableHead>
                <TableHead className="text-gray-500">Status</TableHead>
                <TableHead className="text-gray-500">Quantity</TableHead>
                <TableHead className="text-gray-500">Batch</TableHead>
                <TableHead className="text-gray-500">Date Added</TableHead>
                <TableHead className="text-gray-500">Warranty</TableHead>
                <TableHead className="text-gray-500">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryItems.map((item, index) => (
                <TableRow key={index} className="border-gray-200">
                  <TableCell className="font-medium text-gray-900 truncate max-w-[150px]">{item.model}</TableCell>
                  <TableCell className="text-gray-700 truncate max-w-[150px]">{item.serial}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === "In Stock"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Low Stock"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-700">{item.quantity}</TableCell>
                  <TableCell className="text-gray-700">{item.batch}</TableCell>
                  <TableCell className="text-gray-700">{item.dateAdded}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.warranty === "Active" ? "bg-black text-white" : "bg-red-600 text-white"
                      }`}
                    >
                      {item.warranty}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className=" text-gray-700 border-gray-300 hover:bg-gray-200"
                      >
                        {/* <Pencil className="h-4 w-4" /> */}
                        <span className="">Edit</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className=" text-gray-700 border-gray-300 hover:bg-gray-200"
                      >
                        Restock
                      </Button>
                    </div>
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
