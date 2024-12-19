import { Blog } from '@/app/types/types';
import { useQuery } from '@tanstack/react-query';


export const useGetLatestBlogData = () => {
  return useQuery<Blog[] | null, Error>({
    queryKey: ["limit-blog"],
    queryFn: async () => {
      const response = await fetch(`/api/blog/getlimit`, { method: "GET" });
      if (!response.ok) {
        const errorMessage = `Error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }
      const data: Blog[] = await response.json();
      return data;
    },
  });
};