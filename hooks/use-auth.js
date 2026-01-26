import api from "@/lib/api"
import { useMutation, useQuery } from "@tanstack/react-query"
import { setRefreshToken, setToken } from "@/lib/cookies"
import { useRouter } from "next/navigation";


const login = async (data) => {
    // console.log("CALLING API:", data);
    const response = await api.post("/login/", data,  {
      withCredentials:false
    });
    // console.log("API RESPONSE:", response);
    return response.data;
  };
  

export const useLogin = () => {
    const router = useRouter()
    return useMutation({
      mutationFn: (data) => login(data),
      onSuccess: (data) => {
        console.log("data", data)
        setToken(data.access)
         setRefreshToken(data.refresh);
        // setUser(data.user)
        router.push("/dashboard")
      },
      onError: (error) => {
        console.log("ERROR:", error.response?.data || error.message)
      },
      onSettled: () => {
        console.log("Login settled")
      },
    })
  }
  

    const fetchMe = async () => {
  const res = await api.get("/customers/me/");
  return res.data;
};

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    
  });
};

const logout = async () =>{
  const response = await  api.post ("/auth/logout")
  return response.data
}


export const useLogout = () => {
 return useMutation ({
    mutationFn: logout, 
      onSuccess: (data) => {
          console.log(data)
      
    }
  })
}

