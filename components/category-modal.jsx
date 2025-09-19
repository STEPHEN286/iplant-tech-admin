"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { usePostCategory, useGetCategories, useUpdateCategory } from "@/hooks/use-categories"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

// Category schema
const categorySchema = z.object({
  name: z.string().min(1, "Category name is required").min(2, "Category name must be at least 2 characters"),
})

// Add Category Modal
export function AddCategoryModal({ open, onOpenChange }) {
  const { mutate: createCategory, isPending } = usePostCategory()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  })

  const onSubmit = async (data) => {
    try {
      await createCategory(data)
      reset()
      onOpenChange(false)
    } catch (error) {
      console.error("Error creating category:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Create a new product category for organizing your products.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Category Name *</Label>
            <Input 
              id="name" 
              {...register("name")} 
              placeholder="e.g., Smart Pots" 
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="bg-green-600 hover:bg-green-700">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Category
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Edit Category Modal
export function EditCategoryModal({ categoryId, open, onOpenChange }) {
  const { mutate: updateCategory, isPending } = useUpdateCategory()
  const { categories, isLoading } = useGetCategories()
  
  const category = categories?.find(cat => cat.id === categoryId)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(categorySchema),
  })

  React.useEffect(() => {
    if (category) {
      setValue("name", category.name || "")
    }
  }, [category, setValue])

  const onSubmit = async (data) => {
    try {
      await updateCategory({ id: categoryId, data })
      onOpenChange(false)
    } catch (error) {
      console.error("Error updating category:", error)
    }
  }

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading category...</span>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (!category) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="text-center py-8">
            <p className="text-red-500">Category not found</p>
            <Button variant="outline" onClick={() => onOpenChange(false)} className="mt-4">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Update the category information.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit_name">Category Name *</Label>
            <Input 
              id="edit_name" 
              {...register("name")} 
              placeholder="e.g., Smart Pots" 
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="bg-green-600 hover:bg-green-700">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Category
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
