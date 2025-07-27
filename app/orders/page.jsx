import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ListFilter, FileDown, Pencil, Trash2, Edit, Eye } from "lucide-react"

export default function page() {
  const orders = [
    {
      id: "ORD-001",
      customer: "Sarah Johnson",
      email: "sarahj@email.com",
      product: "Smart Pod v2",
      qty: 1,
      amount: "$299",
      status: "Shipped",
      payment: "Paid",
      date: "2024-01-15",
    },
    {
      id: "ORD-002",
      customer: "Mike Chen",
      email: "mike@email.com",
      product: "Smart Pod v1",
      qty: 2,
      amount: "$398",
      status: "Processing",
      payment: "Paid",
      date: "2024-01-14",
    },
    {
      id: "ORD-003",
      customer: "Emily Davis",
      email: "emily@email.com",
      product: "Smart Pod v2",
      qty: 1,
      amount: "$299",
      status: "Delivered",
      payment: "Paid",
      date: "2024-01-12",
    },
    {
      id: "ORD-004",
      customer: "Alex Rodriguez",
      email: "alex@email.com",
      product: "Smart Pod v2",
      qty: 1,
      amount: "$299",
      status: "Pending",
      payment: "Unpaid",
      date: "2024-01-13",
    },
  ]

  return (
    <div className="grid gap-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">Orders & Customers</h2>
          <p className="text-gray-600">Manage and track all customer orders</p>
        </div>
        <Button className="bg-gray-800 hover:bg-gray-700 text-white">
          <FileDown className="h-4 w-4 mr-2" />
          Export Orders
        </Button>
      </div>

      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Input
            type="search"
            placeholder="Search orders by customer name or order ID..."
            className="max-w-sm flex-1 text-gray-900 placeholder:text-gray-500 border-gray-300"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 text-gray-900 border-gray-300 hover:bg-gray-200"
              >
                <ListFilter className="h-4 w-4" />
                All Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white text-gray-900 border-gray-200">
              <DropdownMenuItem>Shipped</DropdownMenuItem>
              <DropdownMenuItem>Processing</DropdownMenuItem>
              <DropdownMenuItem>Delivered</DropdownMenuItem>
              <DropdownMenuItem>Pending</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Orders ({orders.length})</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200">
                <TableHead className="text-gray-500">Order ID</TableHead>
                <TableHead className="text-gray-500">Customer</TableHead>
                <TableHead className="text-gray-500">Product</TableHead>
                <TableHead className="text-gray-500">Qty</TableHead>
                <TableHead className="text-gray-500">Amount</TableHead>
                <TableHead className="text-gray-500">Status</TableHead>
                <TableHead className="text-gray-500">Payment</TableHead>
                <TableHead className="text-gray-500">Date</TableHead>
                <TableHead className="text-gray-500">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="border-gray-200">
                  <TableCell className="font-medium text-gray-900">{order.id}</TableCell>
                  <TableCell>
                    <div className="font-medium text-gray-900 truncate max-w-[150px]">{order.customer}</div>
                    <div className="hidden text-sm text-gray-700 md:inline truncate max-w-[150px]">{order.email}</div>
                  </TableCell>
                  <TableCell className="text-gray-700 truncate max-w-[150px]">{order.product}</TableCell>
                  <TableCell className="text-gray-700">{order.qty}</TableCell>
                  <TableCell className="text-gray-700">{order.amount}</TableCell>
                  <TableCell>
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
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.payment === "Paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.payment}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-700">{order.date}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8  text-gray-700 border-gray-300 hover:bg-gray-200"
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8  text-gray-700 border-gray-300 hover:bg-gray-200"
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
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
