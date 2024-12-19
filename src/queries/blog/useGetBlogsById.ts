import { apifetch } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { addNewsType, Blog, News } from "@/app/types/types";
import axios from "axios";


export const useGetBlogById =(id:string) => {
  return useQuery<Blog>({
    queryKey: ["blog-id"],
    queryFn:async()=>{
      try {
        const response = await fetch(`/api/blog/id?id=${id}`, { method: "GET" });
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