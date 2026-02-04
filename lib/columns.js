// columns.js
import { Button } from "@/components/ui/button"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DropdownMenu } from "@radix-ui/react-dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { Edit2, Eye, MoreHorizontal, Trash2 } from "lucide-react"




export function CustomerColumn({ onView, onEdit, onDelete }) {
return [
  {
    header: "Customer ID",
    cell: ({ row }) =>  row.original.customer_id || "-",
      
    
  },
  {
    header: "Name",
    cell: ({ row }) => {
      const u = row.original
      const first = u.first_name || ""
      const last = u.last_name || ""
      const full = `${first} ${last}`.trim()
      return full || u.email || "-"
    },
  },
  {
    header: "Email",
    cell: ({ row }) => row.original.email || "-",
  },
  {
    header: "Join Date",
    cell: ({ row }) => (row.original.join_date ? new Date(row.original.join_date).toLocaleDateString() : "-"),
  },
  {
    header: "Orders",
    cell: ({ row }) => row.original.orders || 0,
  },
  {
    header: "Assigned Pod",
    cell: ({ row }) => row.original.assigned_pod || "-",
  },
  {
    header: "Status",
    cell: ({ row }) => row.original.status || "-",
  },
  
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const id = row.original.id
      return (
        <Button variant="outline" className=" ">
        View Profile
        
        </Button>
      )
    },
  },
]
}

export function CategoriesColumn({ onEdit, onDelete }) {
return [
  {
    header: "Category",
    cell: ({ row }) => row.original.name || "-",
  },
  
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const id = row.original.id
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem onClick={() => onEdit && onEdit(id)}>
              <Edit2 />
              <span>Edit</span>
            </DropdownMenuItem> */}
            <DropdownMenuItem onClick={() => onDelete && onDelete(id)} className="text-red-500">
              <Trash2 color="red" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
}

export function AdminsColumn({ onView, onEdit, onDelete }) {
return [
  {
    header: "Admin",
    cell: ({ row }) => {
      const admin = row.original
      const fullName = `${admin.first_name || ""} ${admin.last_name || ""}`.trim()
      return fullName || admin.email || "-"
    },
  },
  {
    header: "Email",
    cell: ({ row }) => row.original.email || "-",
  },
  {
    header: "Contact",
    cell: ({ row }) => row.original.contact || "-",
  },
  {
    header: "Level",
    cell: ({ row }) => row.original.level || "-",
  },
  {
    header: "Status",
    cell: ({ row }) => {
      const isVerified = row.original.isverified
      return isVerified ? "Verified" : "Unverified"
    },
  },
  {
    header: "Joined",
    cell: ({ row }) => (row.original.created_at ? new Date(row.original.created_at).toLocaleDateString() : "-"),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const id = row.original.id
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {onView && (
              <DropdownMenuItem onClick={() => onView(id)}>
                <Eye />
                <span>View</span>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => onEdit && onEdit(id)}>
              <Edit2 />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete && onDelete(id)} className="text-red-500">
              <Trash2 color="red" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
}


