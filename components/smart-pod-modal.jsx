"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { PlusCircle, Edit, Wrench } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {usePostPod, useGetPodById, useUpdatePod, useGetPodModels, usePostPodModel} from "@/hooks/use-smart-pod"
import { smartPodSchema } from "@/lib/schemas"

export function AddPodModal() {
  const [open, setOpen] = useState(false)
  const [addingModel, setAddingModel] = useState(false)
  const { mutate: createPod, isPending } = usePostPod()
  const { models, isLoading: isModelsLoading, error: modelsError, refetch } = useGetPodModels()
  const { mutate: createPodModel, isPending: isModelPending } = usePostPodModel()

  const addingModelNameRef = React.useRef(null)
  const addingModelDescRef = React.useRef(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(smartPodSchema),
    defaultValues: {
      pod_model: "",
      serial_number: "",
      warranty_expiry: "",
      manufacturing_batch: ""
    }
  })

  const onSubmit = (data) => {
    createPod(data, {
      onSuccess: () => {
        reset()
        setOpen(false)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New Pod
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add Smart Pod</DialogTitle>
          <DialogDescription>
            Register a new smart pod to the system.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="pod-model" className="text-right">
                Pod Model *
              </Label>
              <div className="col-span-3 flex gap-2">
                <select 
                  id="pod-model" 
                  {...register("pod_model")}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isModelsLoading && <option>Loading models...</option>}
                  {modelsError && <option>Error loading models</option>}
                  {!isModelsLoading && !modelsError && (
                    <>
                      <option value="">Select a model</option>
                      {models.map((m) => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                      ))}
                    </>
                  )}
                </select>
                <Button type="button" variant="outline" onClick={() => setAddingModel((v) => !v)}>
                  {addingModel ? "Close" : "+ Model"}
                </Button>
              </div>
              {addingModel && (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="new-model-name">Model Name</Label>
                    <Input id="new-model-name" placeholder="e.g. iPlant Basic v2" onChange={(e) => (addingModelNameRef.current = e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new-model-desc">Description</Label>
                    <Input id="new-model-desc" placeholder="Short description" onChange={(e) => (addingModelDescRef.current = e.target.value)} />
                  </div>
                  <div className="col-span-2 flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setAddingModel(false)}>Cancel</Button>
                    <Button type="button" disabled={isModelPending} onClick={() => {
                      const name = addingModelNameRef.current?.trim()
                      const description = addingModelDescRef.current?.trim()
                      if (!name) return
                      createPodModel({ name, description }, {
                        onSuccess: () => {
                          setAddingModel(false)
                          refetch()
                        }
                      })
                    }}>Save</Button>
                  </div>
                </div>
              )}
              {errors.pod_model && (
                <p className="text-sm text-red-600 mt-1">{errors.pod_model.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="serial-number" className="text-right">
                Serial Number *
              </Label>
              <Input
                id="serial-number"
                placeholder="Enter serial number"
                {...register("serial_number")}
                aria-invalid={errors.serial_number ? "true" : "false"}
              />
              {errors.serial_number && (
                <p className="text-sm text-red-600 mt-1">{errors.serial_number.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="manufacturing-batch" className="text-right">
                Manufacturing Batch *
              </Label>
              <Input
                id="manufacturing-batch"
                placeholder="Enter batch number"
                {...register("manufacturing_batch")}
                className="col-span-3"
                aria-invalid={errors.manufacturing_batch ? "true" : "false"}
              />
              {errors.manufacturing_batch && (
                <p className="text-sm text-red-600 mt-1">{errors.manufacturing_batch.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="warranty-expiry" className="text-right">
                Warranty Expiry *
              </Label>
              <Input
                id="warranty-expiry"
                type="date"
                {...register("warranty_expiry")}
                className="col-span-3"
                aria-invalid={errors.warranty_expiry ? "true" : "false"}
              />
              {errors.warranty_expiry && (
                <p className="text-sm text-red-600 mt-1">{errors.warranty_expiry.message}</p>
              )}
            </div>
          </div>
          <DialogFooter className="flex justify-between p-2">
            <DialogClose asChild>
              <Button variant="outline" className="w-1/2 mr-2" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button 
              type="submit" 
              className="bg-green-600 hover:bg-green-700 w-1/2 text-white"
              disabled={isPending}
            >
              {isPending ? "Adding..." : "Add Pod"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function EditPodModal({ podId }) {
  const [open, setOpen] = useState(false)
  
  const { pod, isLoading, error } = useGetPodById(podId)
  const { mutate: updatePod, isPending } = useUpdatePod()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(smartPodSchema),
    defaultValues: {
      pod_model: "",
      serial_number: "",
      warranty_expiry: "",
      manufacturing_batch: ""
    }
  })

  // Update form values when pod data is loaded
  React.useEffect(() => {
    if (pod) {
      setValue("pod_model", pod.pod_model || "")
      setValue("serial_number", pod.serial_number || "")
      setValue("warranty_expiry", pod.warranty_expiry || "")
      setValue("manufacturing_batch", pod.manufacturing_batch || "")
    }
  }, [pod, setValue])

  const onSubmit = (data) => {
    updatePod(
      { id: podId, data },
      {
        onSuccess: () => {
          setOpen(false)
        }
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="h-8 px-2">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Smart Pod</DialogTitle>
          <DialogDescription>
            Update smart pod information.
          </DialogDescription>
        </DialogHeader>
        
        {isLoading ? (
          <div className="py-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
            <p className="text-gray-600 mt-2">Loading pod information...</p>
          </div>
        ) : error ? (
          <div className="py-8 text-center text-red-600">
            <p>Failed to load pod information</p>
            <p className="text-sm text-gray-600">{error.message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-pod-model" className="text-right">
                  Pod Model *
                </Label>
                <div className="col-span-3">
                  <select 
                    id="edit-pod-model" 
                    {...register("pod_model")}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-invalid={errors.pod_model ? "true" : "false"}
                  >
                    <option value="">Select a model</option>
                    <option value="PlantPal Pro">PlantPal Pro</option>
                    <option value="PlantPal Mini">PlantPal Mini</option>
                    <option value="PlantPal Pro+">PlantPal Pro+</option>
                  </select>
                  {errors.pod_model && (
                    <p className="text-sm text-red-600 mt-1">{errors.pod_model.message}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-serial-number" className="text-right">
                  Serial Number *
                </Label>
                <Input
                  id="edit-serial-number"
                  placeholder="Enter serial number"
                  {...register("serial_number")}
                  aria-invalid={errors.serial_number ? "true" : "false"}
                />
                {errors.serial_number && (
                  <p className="text-sm text-red-600 mt-1">{errors.serial_number.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-manufacturing-batch" className="text-right">
                  Manufacturing Batch *
                </Label>
                <Input
                  id="edit-manufacturing-batch"
                  placeholder="Enter batch number"
                  {...register("manufacturing_batch")}
                  className="col-span-3"
                  aria-invalid={errors.manufacturing_batch ? "true" : "false"}
                />
                {errors.manufacturing_batch && (
                  <p className="text-sm text-red-600 mt-1">{errors.manufacturing_batch.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-warranty-expiry" className="text-right">
                  Warranty Expiry *
                </Label>
                <Input
                  id="edit-warranty-expiry"
                  type="date"
                  {...register("warranty_expiry")}
                  className="col-span-3"
                  aria-invalid={errors.warranty_expiry ? "true" : "false"}
                />
                {errors.warranty_expiry && (
                  <p className="text-sm text-red-600 mt-1">{errors.warranty_expiry.message}</p>
                )}
              </div>
            </div>
            <DialogFooter className="flex justify-between p-2">
              <DialogClose asChild>
                <Button variant="outline" className="w-1/2 mr-2" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button 
                type="submit" 
                className="bg-green-600 hover:bg-green-700 w-1/2 text-white"
                disabled={isPending}
              >
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

export function MaintenanceRequestModal({ podId }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="h-8 px-2 ml-1">
          <Wrench className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Maintenance Request</DialogTitle>
          <DialogDescription>
            Submit a maintenance request for this smart pod.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="pod-id" className="text-right">
              Smart Pod ID
            </Label>
            <Input
              id="pod-id"
              defaultValue={podId}
              readOnly
              className="bg-gray-50"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="issue-type" className="text-right">
              Issue Type
            </Label>
            <div>
              <select 
                id="issue-type" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select issue type</option>
                <option value="Hardware">Hardware</option>
                <option value="Software">Software</option>
                <option value="Connectivity">Connectivity</option>
                <option value="Sensor">Sensor</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="priority" className="text-right">
              Priority
            </Label>
            <div>
              <select 
                id="priority" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <textarea
              id="description"
              placeholder="Describe the issue in detail"
              className="min-h-[80px] flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="schedule" className="text-right">
              Schedule
            </Label>
            <Input
              id="schedule"
              type="date"
            />
          </div>
        </div>
        <DialogFooter className="flex justify-between p-2">
          <DialogClose asChild>
            <Button variant="outline" className="w-1/2 mr-2">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-green-600 hover:bg-green-700 w-1/2 text-white">
            Submit Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}