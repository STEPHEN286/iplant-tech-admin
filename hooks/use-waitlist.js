"use client"

import api from "@/lib/api"
import { useQuery } from "@tanstack/react-query"


const getWaitlist = async () => {
    const response = await api.get("join/waitlist")
    return response.data
}

const useWaitlist = () => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["waitlist"],
        queryFn: getWaitlist,
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
    })

    return { 
        data, 
        isLoading, 
        error,
        refetch,
        waitlist: data?.results || [],
        totalCount: data?.count || 0,
        hasNext: !!data?.next,
        hasPrevious: !!data?.previous
    }
}

export { useWaitlist }