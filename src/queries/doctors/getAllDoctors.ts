import { apifetch } from "@/api";
import { Doctor, doctroType } from "@/app/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export const useGetDoctor =() => {
  return useQuery<doctroType []| null>({
    queryKey: ["doctor"],
    queryFn:async()=>{
      const response = await fetch(`/api/Doctor`, { method: "GET" });
      if (!response.ok) {
        const errorMessage = `Error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }
      const data:doctroType[]= await response.json();
      return data;
    },
  });
};


