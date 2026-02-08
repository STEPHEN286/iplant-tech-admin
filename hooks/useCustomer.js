import api from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

const  getCustomers =  async() => {
    const response = await api.get("/customers")
    return response.data
}


export const  useGetCustomers = () =>  { 
    return useQuery ({
        queryFn: getCustomers, 
        queryKey: ['customers']
    })
}

const getCustomersSummary = async () => {
    const response = await api.get("/dashboard/stats/")
    return response.data
}


export const useGetCustomersSummary = () => {
    return useQuery({
        queryFn: getCustomersSummary,
        queryKey: ['customers-summary']
    })
}