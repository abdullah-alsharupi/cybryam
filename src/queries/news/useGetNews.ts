import { apifetch } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { News } from "@/app/types/types";


export const useGetNews =() => {
  return useQuery<News[] |null>({
    queryKey: ["news"],
    queryFn:async()=>{
      const response = await fetch(`/api/News`, { method: "GET" });
      if (!response.ok) {
        const errorMessage = `Error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }
      const data: News[] = await response.json();
      return data;
    }
  });
};

const getNews = async (): Promise<News[]> => {
   const response = await apifetch.get(`/News`);
  if (!response.data) {
    throw new Error("Error");
  }
  return response.data
};
