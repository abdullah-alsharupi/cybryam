import { apifetch } from "@/api";
import { Oppontement, User } from "@/app/types/types";
import { useQuery } from "@tanstack/react-query";

export const useGetPatientsbyId =(id:string) => {
  return useQuery({
    queryKey: ["patient-id"],
    queryFn:async()=>{
      const response = await fetch(`/api/oppointment/id?id=${id}`, { method: "GET" });
      if (!response.ok) {
        const errorMessage = `Error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }
      const data= await response.json();
      return data;
    }
  });
};

const getUserbyId = async (id:string,token:string): Promise<any> => {
  const response = await apifetch.get(`/user/id?id=${id}`,{headers:{Authorization:`Bearer ${token}`}});
  if (!response.data) {
    throw new Error("Error");
  }
  return response.data
};
