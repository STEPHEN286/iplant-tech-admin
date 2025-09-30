"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { productSchema } from "@/lib/schemas"
import { usePostProduct, useGetProductById, useUpdateProduct } from "@/hooks/use-products"
import { useGetPodModels } from "@/hooks/use-smart-pod"
import { useGetCategories, usePostCategory } from "@/hooks/use-categories"
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
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

// Add Product Modal
export function AddProductModal({ open, onOpenChange }) {
  const { mutate: createProduct, isPending } = usePostProduct()
  const { models, isLoading: modelsLoading, error: modelsError, refetch } = useGetPodModels()
  const { categories, isLoading: categoriesLoading, error: categoriesError, refetch: refetchCategories } = useGetCategories()
  const { mutate: createCategory, isPending: isCreatingCategory } = usePostCategory()
  const [imagePreview, setImagePreview] = useState(null)

  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      stock: 0,
      price: "",
      category: "",
      pod_model: "",
    },
  })

  const watchedImage = watch("image")

  // Handle image preview
  React.useEffect(() => {
    if (watchedImage && watchedImage.length > 0) {
      const file = watchedImage[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => setImagePreview(e.target.result)
        reader.readAsDataURL(file)
      }
    } else {
      setImagePreview(null)
    }
  }, [watchedImage])

  const onSubmit = async (data) => {
    try {
      await createProduct(data)
      reset()
      setImagePreview(null)
      onOpenChange(false)
    } catch (error) {
      console.error("Error creating product:", error)
    }
  }

 

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full sm:max-w34xl">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Adding a new product to the admin system.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Pod & Model Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Pod Name *</Label>
              <Input id="name" {...register("name")} placeholder="Enter Pod Name" />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pod_model">Smart-Pod Model *</Label>
              <select
                id="pod_model"
                {...register("pod_model")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {modelsLoading && <option>Loading models...</option>}
                {modelsError && <option>Error loading models</option>}
                {!modelsLoading && !modelsError && (
                  <>
                    <option value="">Select Pod Model</option>
                    {models.map((m) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </>
                )}
              </select>
              {errors.pod_model && <p className="text-sm text-red-500">{errors.pod_model.message}</p>}
            </div>
          </div>

          {/* Category & Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <select
                id="category"
                {...register("category")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {categoriesLoading && <option>Loading categories...</option>}
                {categoriesError && <option>Error loading categories</option>}
                {!categoriesLoading && !categoriesError && (
                  <>
                    <option value="">Select Category</option>
                    {categories?.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </>
                )}
              </select>
              {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock *</Label>
              <Input id="stock" type="number" {...register("stock", { valueAsNumber: true })} placeholder="0" min="0" />
              {errors.stock && <p className="text-sm text-red-500">{errors.stock.message}</p>}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea id="description" {...register("description")} placeholder="e.g. I joined Stripe's Customer Success team to help them scale their checkout product. I focused mainly on onboarding new customers and resolving complaints." rows={4} className="resize-none" />
            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
          </div>

          {/* Image & Price */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <div className="relative">
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  {...register("image")}
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                />
                {imagePreview ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="max-h-32 w-full object-contain mx-auto rounded"
                    />
                    <p className="text-sm text-gray-500 mt-2">Click to change image</p>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                    <div className="flex flex-col items-center">
                      <svg className="h-8 w-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                      <p className="text-gray-500 text-sm">Tap to add image</p>
                    </div>
                  </div>
                )}
              </div>
              {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price *</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">GHS</span>
                <Input id="price" type="text" {...register("price")} placeholder="0.00" className="pl-12" />
              </div>
              {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">Cancel</Button>
            <Button type="submit" disabled={isPending} className="flex-1 bg-green-600 hover:bg-green-700">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Edit Product Modal
export function EditProductModal({ productId, open, onOpenChange }) {
  const { data: product, isLoading, error } = useGetProductById(productId)
  const { mutate: updateProduct, isPending } = useUpdateProduct()
  const { models, isLoading: modelsLoading, error: modelsError } = useGetPodModels()
  const { categories, isLoading: categoriesLoading, error: categoriesError } = useGetCategories()
  const [imagePreview, setImagePreview] = useState(null)
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({ resolver: zodResolver(productSchema) })

  const watchedImage = watch("image")

  // Handle image preview
  React.useEffect(() => {
    if (watchedImage && watchedImage.length > 0) {
      const file = watchedImage[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => setImagePreview(e.target.result)
        reader.readAsDataURL(file)
      }
    } else if (product?.image) {
      setImagePreview(product.image)
    } else {
      setImagePreview(null)
    }
  }, [watchedImage, product?.image])

  React.useEffect(() => {
    if (product) {
      setValue("name", product.name || "")
      setValue("description", product.description || "")
      setValue("stock", product.stock || 0)
      setValue("price", product.price || "")
      setValue("category", product.category?.id || "")
      setValue("pod_model", product.pod_model?.id || "")
    }
  }, [product, setValue])

  const onSubmit = async (data) => {
    try { 
      updateProduct({ id: productId, data }, {
        onSuccess: () => {
          onOpenChange(false)
        }
      })
    } catch (e) { 
      console.error(e) 
    }
  }

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <div className="flex items-center justify-center py-8"><Loader2 className="h-8 w-8 animate-spin" /><span className="ml-2">Loading product...</span></div>
        </DialogContent>
      </Dialog>
    )
  }

  if (error) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <div className="text-center py-8">
            <p className="text-red-500">Failed to load product data</p>
            <Button variant="outline" onClick={() => onOpenChange(false)} className="mt-4">Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>Update the product information. All
             fields are required.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit_name">Product Name *</Label>
              <Input id="edit_name" {...register("name")} placeholder="Enter Product Name" />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit_pod_model">Smart-Pod Model *</Label>
              <select id="edit_pod_model" {...register("pod_model")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                {modelsLoading && <option>Loading models...</option>}
                {modelsError && <option>Error loading models</option>}
                {!modelsLoading && !modelsError && (
                  <>
                    <option value="">Select Pod Model</option>
                    {models.map((m) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </>
                )}
              </select>
              {errors.pod_model && <p className="text-sm text-red-500">{errors.pod_model.message}</p>}
            </div>
          </div>

          
          <div className="space-y-2">
            <Label htmlFor="edit_description">Description *</Label>
            <Textarea id="edit_description" {...register("description")} placeholder="Describe the product..." rows={3} />
            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
          </div>

          {/* Image */}
          <div className="space-y-2">
            <Label htmlFor="edit_image">Image</Label>
            <div className="relative">
              <input
                id="edit_image"
                type="file"
                accept="image/*"
                {...register("image")}
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
              />
              {imagePreview ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="max-h-32 w-full object-contain mx-auto rounded"
                  />
                  <p className="text-sm text-gray-500 mt-2">Click to change image</p>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                  <div className="flex flex-col items-center">
                    <svg className="h-8 w-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    <p className="text-gray-500 text-sm">Tap to add image</p>
                  </div>
                </div>
              )}
            </div>
            {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit_price">Price *</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">GHS</span>
                <Input id="edit_price" type="text" {...register("price")} placeholder="0.00" className="pl-12" />
              </div>
              {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={isPending}>Update Product</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
