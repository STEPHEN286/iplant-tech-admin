import api from "@/lib/api"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

const getPodById = async (id) => {
    const response = await api.get(`/smartpod/${id}/`)
    return response.data
}

// useGetPodById: useQuery hook to get a specific smart pod by ID
export const useGetPodById = (id) => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["smartpod", id],
        queryFn: () => getPodById(id),
        enabled: !!id, // Only run query if id is provided
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
    })
    
    return {
        data,
        isLoading,
        error,
        refetch,
        pod: data
    }
}

const getPods = async () => {
    const response = await api.get("/smartpod/")
    return response.data
}

// useGetPods: useQuery hook to get all smart pods
export const useGetPods = () => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["smartpod"],
        queryFn: getPods,
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
    })
    
    return {
        data,
        isLoading,
        error,
        refetch,
        pods: data?.results || [],
        totalCount: data?.count || 0,
        hasNext: !!data?.next,
        hasPrevious: !!data?.previous
    }
}

const postPod = async (data) => {
    const response = await api.post("/smartpod/", data)
    return response.data
}

const updatePod = async ({ id, data }) => {
    const response = await api.put(`/smartpod/${id}/`, data)
    return response.data
}

// usePostPod: useMutation hook to create a new smart pod
export const usePostPod = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: (data) => postPod(data),
        onSuccess: (data) => {
            toast.success(data.message || "Smart pod created successfully")
            queryClient.invalidateQueries({ queryKey: ["smartpod"] })
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || error.message || "Failed to create smart pod")
        },
    })
}

// useUpdatePod: useMutation hook to update an existing smart pod
export const useUpdatePod = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: ({ id, data }) => updatePod({ id, data }),
        onSuccess: (data, variables) => {
            toast.success(data.message || "Smart pod updated successfully")
            // Invalidate both the specific pod and the pods list
            queryClient.invalidateQueries({ queryKey: ["smartpod", variables.id] })
            queryClient.invalidateQueries({ queryKey: ["smartpod"] })
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || error.message || "Failed to update smart pod")
        },
    })
}

// Pod Models
const getPodModels = async () => {
    const response = await api.get("/pod-models/")
    return response.data
}

export const useGetPodModels = () => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["pod-models"],
        queryFn: getPodModels,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    })

    return {
        data,
        isLoading,
        error,
        refetch,
        models: data?.results || [],
    }
}

// Create Pod Model
const postPodModel = async (data) => {
    const response = await api.post("/pod-models/", data)
    return response.data
}

export const usePostPodModel = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: postPodModel,
        onSuccess: () => {
            toast.success("Pod model added")
            queryClient.invalidateQueries({ queryKey: ["pod-models"] })
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || error.message || "Failed to add pod model")
        }
    })
}



