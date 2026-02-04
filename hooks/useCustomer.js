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