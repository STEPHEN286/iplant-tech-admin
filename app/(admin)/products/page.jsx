"use client"

import { useState } from "react"
import { useGetProducts, useDeleteProduct } from "@/hooks/use-products"
import { AddProductModal, EditProductModal } from "@/components/product-modal"
import SummaryCard from "@/components/summary-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Package,
  PackageCheck,
  PackageX,
  Wrench,
  RefreshCw,
  Loader2,
} from "lucide-react"

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState(null)

  const { data, isLoading, error, refetch } = useGetProducts()

  const { deleteProduct, isPending: isDeleting } = useDeleteProduct()

  const products = data?.results || []
  const totalCount = data?.count || 0

  // Calculate summary data
  const summaryData = [
    {
      title: "Total Products",
      value: totalCount.toString(),
      change: "+12 from last month",
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "In Stock",
      value: products.filter(p => p.stock > 0).length.toString(),
      change: "Ready for purchase",
      icon: PackageCheck,
      color: "text-green-600",
    },
    {
      title: "Out of Stock",
      value: products.filter(p => p.stock === 0).length.toString(),
      change: "Finished products",
      icon: PackageX,
      color: "text-blue-600",
    },
    {
      title: "Maintenance",
      value: "4",
      change: "Needs attention",
      icon: Wrench,
      color: "text-orange-600",
    },
  ]

  const handleEdit = (productId) => {
    setSelectedProductId(productId)
    setEditModalOpen(true)
  }

  const handleDelete = async (productId) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(productId)
      } catch (error) {
        console.error("Error deleting product:", error)
      }
    }
  }

  const getStockBadge = (stock) => {
    if (stock > 10) {
      return <Badge className="bg-green-100 text-green-800">In Stock</Badge>
    } else if (stock > 0) {
      return <Badge className="bg-yellow-100 text-yellow-800">Low Stock</Badge>
    } else {
      return <Badge className="bg-red-100 text-red-800">Out Of Stock</Badge>
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
    }).format(price)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB")
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading products...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Failed to load products</p>
        <p className="text-sm text-gray-500 mt-2">
          Error: {error?.message || error?.response?.data?.message || "Unknown error"}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Status: {error?.response?.status}
        </p>
        <Button onClick={() => refetch()} className="mt-4">
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Product Management</h1>
          <p className="text-muted-foreground">
            Manage and track all products in your inventory
          </p>
        </div>
        <Button onClick={() => setAddModalOpen(true)} className="bg-green-600 hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryData.map((item, index) => (
          <SummaryCard
            key={index}
            title={item.title}
            value={item.value}
            change={item.change}
            icon={item.icon}
            color={item.color}
          />
        ))}
      </div>

      {/* Pod Inventory Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Pod Inventory</h2>
          <p className="text-muted-foreground">
            Manage and track all smart pods in your inventory
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by product name or model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All Categories">All Categories</option>
              <option value="Smart Pots">Smart Pots</option>
              <option value="Accessories">Accessories</option>
              <option value="Sensors">Sensors</option>
            </select>
            <Button
              variant="outline"
              onClick={() => refetch()}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>

        {/* Products Table */}
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pod Model</TableHead>
                  <TableHead>Pod Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8">
                      No products found
                    </TableCell>
                  </TableRow>
                ) : (
                  products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        {product.pod_model?.name || 'N/A'}
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{product.category?.name || 'N/A'}</Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {product.description}
                      </TableCell>
                      <TableCell>{getStockBadge(product.stock)}</TableCell>
                      <TableCell>
                        <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                          <Package className="h-4 w-4 text-gray-400" />
                        </div>
                      </TableCell>
                      <TableCell>{formatPrice(product.price)}</TableCell>
                      <TableCell>{formatDate(product.created_at)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(product.id)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(product.id)}
                              className="text-red-600"
                              disabled={isDeleting}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddProductModal
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
      />
      <EditProductModal
        productId={selectedProductId}
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
      />
    </div>
  )
}
