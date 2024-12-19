import { apifetch } from "@/api";
import { Oppontement } from "@/app/types/types";
import { useQuery } from "@tanstack/react-query";

export const useGetAcceptedRequests =() => {
    return useQuery<Oppontement[] |null>({
      queryKey: ["patient"],
      queryFn:async()=>{
        const response = await fetch(`/api//patient/getAcceptedRequests`, { method: "GET" });
        if (!response.ok) {
          const errorMessage = `Error: ${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        }
        const data= await response.json();
        return data;
    
      }
    });
  };