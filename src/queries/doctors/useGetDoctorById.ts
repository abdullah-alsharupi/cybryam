import { apifetch } from "@/api";
import { doctroType } from "@/app/types/types";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useGetDoctorById(id: string,token?:string) {
  return useQuery({
    queryKey: [`getDoctorById`],
    queryFn: async () => {
      const response = await fetch(`/api/Doctor/id?id=${id}`, { method: "GET" });
      if (!response.ok) {
        const errorMessage = `Error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }
      const data= await response.json();
      return data;
    },
  });
}

const fetcDoctor = async (id: string,token:string): Promise<any> => {
  const response = await apifetch.get(`/Doctor/id?id=${id}`);
  if (!response.data) {
    throw new Error("Error");
  }
  return response.data;
};
