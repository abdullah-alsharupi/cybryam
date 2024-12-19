import { apifetch } from "@/api";
import { News } from "@/app/types/types";
import db from "@/db/db";
import { useQuery } from "@tanstack/react-query";

export const useGetLatestNewsData = () => {
  return useQuery<News[] | null, Error>({
    queryKey: ["limit-News"],
    queryFn: async () => {
      const response = await fetch(`/api/News/getlimit`, { method: "GET" });
      if (!response.ok) {
        const errorMessage = `Error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }
      const data: News[] = await response.json();
      return data;
    },
  });
};
  
