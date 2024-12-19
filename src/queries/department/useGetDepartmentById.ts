import { apifetch } from "@/api";
import { departmentType } from "@/app/types/types";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { headers } from "next/headers";


export default function useGetDepartmentById (id:string,token?:any)  {
  return useQuery({
    queryKey: ["departments"],
    queryFn:async()=>{
      const response = await fetch(`/api//Department/id?id=${id}`, { method: "GET" });
      if (!response.ok) {
        const errorMessage = `Error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }
      const data= await response.json();
      return data;
    },
  });
};

const fetcDoctor = async (id:string): Promise<any> => {
  const response = await apifetch.get(`/Department/id?id=${id}`,{headers:{Authorization:`Bearer ${""}`}});
  if (!response.data) {
    throw new Error("Error");
  }
  return response.data
};
