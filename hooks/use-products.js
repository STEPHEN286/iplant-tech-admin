import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import  api  from "@/lib/api"
import toast from "react-hot-toast"

// Get all products
export const getProducts = async () => {
  try {
    // console.log("Fetching products with params:", params)
    const response = await api.get("/products/",)
    console.log("Products response:", response.data)
    return response.data
  } catch (error) {
    console.error("Error fetching products:", error)
    throw error
  }
}

// Get single product by ID
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}/`)
    return response.data
  } catch (error) {
    console.error("Error fetching product by ID:", error)
    throw error
  }
}

// Create new product
export const postProduct = async (data) => {
  try {
    const response = await api.post("/products/", data)
    return response.data
  } catch (error) {
    console.error("Error creating product:", error)
    throw error
  }
}

// Update product
export const updateProduct = async ({ id, data }) => {
  try {
    const response = await api.put(`/products/${id}/`, data)
    return response.data
  } catch (error) {
    console.error("Error updating product:", error)
    throw error
  }
}

// Delete product
export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/products/${id}/`)
    return response.data
  } catch (error) {
    console.error("Error deleting product:", error)
    throw error
  }
}

// Hooks
export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  })
}

export const useGetProductById = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}

export const usePostProduct = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: postProduct,
    onSuccess: (data) => {
      toast.success("New product added successfully!", {
        description: "A new product has been added successfully. Refresh to view in catalog.",
        duration: 5000,
      })
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
    onError: (error) => {
      toast.error("Failed to add new product.", {
        description: "Something went wrong. Your action could not be completed. Please try again or contact support if the issue persists.",
        duration: 5000,
      })
    },
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: updateProduct,
    onSuccess: (data, variables) => {
      toast.success("Product updated successfully!")
      queryClient.invalidateQueries({ queryKey: ["products"] })
      queryClient.invalidateQueries({ queryKey: ["product", variables.id] })
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update product")
    },
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("Product deleted successfully!")
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete product")
    },
  })
}
