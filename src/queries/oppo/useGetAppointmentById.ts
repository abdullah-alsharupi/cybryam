import { useQuery } from "@tanstack/react-query";

import { apifetch } from "@/api";
import { Oppontement } from "@/app/types/types";

export const useGetAppointmentById=(id:string) => {
  return useQuery({
    queryKey: ["oppointment-id"],
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
