import { apifetch } from "@/api";
import { Doctor } from "@/app/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export const useGetPatient =() => {
  return useQuery({
    queryKey: ["patient"],
    queryFn:async()=>{
      const response = await fetch(`/api/patient`, { method: "GET" });
      if (!response.ok) {
        const errorMessage = `Error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }
      const data= await response.json();
      return data;
    }
  });
};

const fetchPatient = async (): Promise<any> => {
 
};

