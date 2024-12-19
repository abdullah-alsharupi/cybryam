import { apifetch } from "@/api";
import { Hospital, News } from "@/app/types/types";

import { useQuery } from "@tanstack/react-query";

export const useGetHospital =() => {
    return useQuery<Hospital[]|null>({
      queryKey: [""],
      queryFn:async()=>{
        const response = await fetch(`/api/hospital`, { method: "GET" });
      if (!response.ok) {
        const errorMessage = `Error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }
      const data= await response.json();
      return data;
      }
    });
  };
  