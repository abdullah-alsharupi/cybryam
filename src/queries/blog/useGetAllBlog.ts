import { apifetch } from "@/api";
import { Blog } from "@/app/types/types";
import { useQuery } from "@tanstack/react-query";
import { useBlogStore } from "@/store/blog/useBlogStore";
export const useGetAllBlog =() => {
  const setBlog=useBlogStore().setGlobalBlog
    return useQuery<Blog[] |null>({
      queryKey: ["blog"],
      queryFn:async()=>{
        const response = await fetch(`/api/blog`, { method: "GET" });
      if (!response.ok) {
        const errorMessage = `Error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }
      const data= await response.json();
      setBlog(data)
      return data;
      }
    });
  };
  