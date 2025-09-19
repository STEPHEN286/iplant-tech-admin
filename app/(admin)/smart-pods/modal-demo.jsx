"use client"

import { AddPodModal, EditPodModal, MaintenanceRequestModal } from "@/components/smart-pod-modal"

export default function SmartPodModalDemo() {
  return (
    <div className="container mx-auto py-10 space-y-10">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Smart Pod Modals</h1>
        <p className="text-gray-500">Demo of the smart pod modals using shadcn dialog component</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold">Add Smart Pod</h2>
          <p className="text-gray-500">Register a new smart pod to the system</p>
          <AddPodModal />
        </div>

        <div className="border rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold">Edit Smart Pod</h2>
          <p className="text-gray-500">Update existing smart pod information</p>
          <EditPodModal podId="SP-2023-0042" />
        </div>

        <div className="border rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold">Maintenance Request</h2>
          <p className="text-gray-500">Submit a maintenance request for a smart pod</p>
          <MaintenanceRequestModal podId="SP-2023-0042" />
        </div>
      </div>

      <div className="mt-10 p-6 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Implementation Notes</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>All modals use the shadcn Dialog component</li>
          <li>Consistent styling with the rest of the admin dashboard</li>
          <li>Responsive design for all screen sizes</li>
          <li>Form validation can be added using react-hook-form and zod</li>
        </ul>
      </div>
    </div>
  )
}