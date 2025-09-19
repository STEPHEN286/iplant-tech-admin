import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/api"
import toast from "react-hot-toast"

// Get all categories
export const getCategories = async () => {
  try {
    const response = await api.get("/categories/")
    console.log("Categories response:", response.data)
    return response.data
  } catch (error) {
    console.error("Error fetching categories:", error)
    throw error
  }
}

// Create new category
export const postCategory = async (data) => {
  try {
    const response = await api.post("/categories/", data)
    return response.data
  } catch (error) {
    console.error("Error creating category:", error)
    throw error
  }
}

// Update category
export const updateCategory = async ({ id, data }) => {
  try {
    const response = await api.put(`/categories/${id}/`, data)
    return response.data
  } catch (error) {
    console.error("Error updating category:", error)
    throw error
  }
}

// Delete category
export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/categories/${id}/`)
    return response.data
  } catch (error) {
    console.error("Error deleting category:", error)
    throw error
  }
}

// Hooks
export const useGetCategories = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  })

  return {
    categories: data?.results || data || [],
    isLoading,
    error,
    refetch,
    totalCount: data?.count || 0,
  }
}

export const usePostCategory = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: postCategory,
    onSuccess: (data) => {
      toast.success("Category created successfully!", {
        description: "A new category has been added successfully.",
        duration: 5000,
      })
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
    onError: (error) => {
      toast.error("Failed to create category.", {
        description: error.response?.data?.message || "Something went wrong. Please try again.",
        duration: 5000,
      })
    },
  })
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: updateCategory,
    onSuccess: (data, variables) => {
      toast.success("Category updated successfully!")
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update category")
    },
  })
}

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast.success("Category deleted successfully!")
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete category")
    },
  })
}
