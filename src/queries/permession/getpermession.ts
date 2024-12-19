import { apifetch } from "@/api";
import { Department } from "@/app/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";



export const useGetPermession =() => {
  return useQuery({
    queryKey: ["permession"],
    queryFn:async()=>{
      const response = await fetch(`/api/permession`, { method: "GET" });
      if (!response.ok) {
        const errorMessage = `Error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }
      const data = await response.json();
      return data;
    }
  });
};

const getDepartment = async (): Promise<Department[]> => {
  const response = await apifetch.get(`permession`);
  if (!response.data) {
    throw new Error("Error");
  }
  return response.data
};
