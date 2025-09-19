"use client"

import SummaryCard from "../../../components/summary-card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ListFilter, PlusCircle, HardDrive, CheckCircle, Users2, Wrench, RefreshCw } from "lucide-react"
import { AddPodModal, EditPodModal, MaintenanceRequestModal } from "@/components/smart-pod-modal"
import { useGetPods } from "@/hooks/use-smart-pod"

export default function SmartPodsPage() {
  const { pods, totalCount, isLoading, error, refetch } = useGetPods()

  // Loading state
  if (isLoading) {
    return (
      <div className="grid gap-6 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-900">Smart Pods Inventory</h2>
            <p className="text-gray-600">Manage your smart pod inventory and track assignments</p>
          </div>
          <AddPodModal />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg p-4 border border-gray-200 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="grid gap-6 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-900">Smart Pods Inventory</h2>
            <p className="text-gray-600">Manage your smart pod inventory and track assignments</p>
          </div>
          <AddPodModal />
        </div>
        <div className="bg-white rounded-lg p-8 border border-gray-200 text-center">
          <div className="text-red-500 mb-4">
            <Wrench className="h-12 w-12 mx-auto mb-2" />
            <h3 className="text-lg font-semibold">Failed to load smart pods</h3>
            <p className="text-gray-600">{error.message || "Something went wrong"}</p>
          </div>
          <Button onClick={() => refetch()} className="bg-green-600 hover:bg-green-700 text-white">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  // Calculate summary data from real API data
  const availablePods = pods.filter(pod => {
    const warrantyDate = new Date(pod.warranty_expiry)
    const today = new Date()
    return warrantyDate > today
  }).length

  const expiredPods = pods.filter(pod => {
    const warrantyDate = new Date(pod.warranty_expiry)
    const today = new Date()
    return warrantyDate <= today
  }).length

  const summaryData = [
    { title: "Total Pods", value: totalCount?.toString() || "0", change: `${pods.length} registered`, icon: HardDrive, iconColor: "text-gray-500" },
    { title: "Active Warranty", value: availablePods.toString(), change: "Under warranty", icon: CheckCircle, iconColor: "text-green-500" },
    { title: "Expired Warranty", value: expiredPods.toString(), change: "Warranty expired", icon: Users2, iconColor: "text-red-500" },
    { title: "Models", value: [...new Set(pods.map(pod => pod.pod_model))].length.toString(), change: "Different models", icon: Wrench, iconColor: "text-orange-500" },
  ]

  return (
    <div className="grid gap-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">Smart Pods Inventory</h2>
          <p className="text-gray-600">Manage your smart pod inventory and track assignments</p>
        </div>
        <AddPodModal />
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
          <Button
            variant="outline"
            onClick={() => refetch()}
            className="flex items-center gap-2 text-gray-900 border-gray-300 hover:bg-gray-200"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
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
              <DropdownMenuItem>All Models</DropdownMenuItem>
              <DropdownMenuItem>PlantPal Pro</DropdownMenuItem>
              <DropdownMenuItem>PlantPal Mini</DropdownMenuItem>
              <DropdownMenuItem>PlantPal Pro+</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200">
                <TableHead className="text-gray-500">Pod ID</TableHead>
                <TableHead className="text-gray-500">Model</TableHead>
                <TableHead className="text-gray-500">Serial Number</TableHead>
                <TableHead className="text-gray-500">Manufacturing Batch</TableHead>
                <TableHead className="text-gray-500">Warranty Status</TableHead>
                <TableHead className="text-gray-500">Warranty Expiry</TableHead>
                <TableHead className="text-gray-500">Created Date</TableHead>
                <TableHead className="text-gray-500">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pods.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    No smart pods found. Click "Add Pod" to register your first pod.
                  </TableCell>
                </TableRow>
              ) : (
                pods.map((pod) => {
                  const warrantyDate = new Date(pod.warranty_expiry)
                  const today = new Date()
                  const isWarrantyActive = warrantyDate > today
                  
                  return (
                    <TableRow key={pod.id} className="border-gray-200">
                      <TableCell className="font-medium text-gray-900">{pod.id.slice(0, 8)}...</TableCell>
                      <TableCell className="text-gray-700 truncate max-w-[150px]">{pod.pod_model}</TableCell>
                      <TableCell className="text-gray-700 truncate max-w-[150px]">{pod.serial_number}</TableCell>
                      <TableCell className="text-gray-700">{pod.manufacturing_batch}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            isWarrantyActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {isWarrantyActive ? "Active" : "Expired"}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-700">{new Date(pod.warranty_expiry).toLocaleDateString()}</TableCell>
                      <TableCell className="text-gray-700">{new Date(pod.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <EditPodModal podId={pod.id} />
                          <MaintenanceRequestModal podId={pod.id} />
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
