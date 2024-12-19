import { useQuery } from "@tanstack/react-query";

import { apifetch } from "@/api";
import { Oppontement, Patient } from "@/app/types/types";
export type PatientsWithOppon=Oppontement;

export const useGetAllPatientsWithOppon =() => {
  return useQuery<Oppontement[] |null>({
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
