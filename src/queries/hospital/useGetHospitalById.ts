import { apifetch } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { addNewsType, Blog, Hospital, News } from "@/app/types/types";
import axios from "axios";


export const useGetHospitalById =(id:string) => {
  return useQuery<Hospital>({
    queryKey: ["hosptial-id"],
    queryFn:async()=>{
      try {
        const response = await fetch(`/api/hospital/id?id=${id}`, { method: "GET" });
      if (!response.ok) {
        const errorMessage = `Error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }
      const data= await response.json();
      return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
        
          throw new Error(error.response?.data.message || "Unexpected error");
        }
       
        throw error;
      }
    }
  });
};