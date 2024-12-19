import { apifetch } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { News } from "@/app/types/types";
import axios from "axios";

export const useGetNewsById = (id: string) => {
  return useQuery<News>({
    queryKey: ["getnews-id"],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/News/id?id=${id}`, { method: "GET" });
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
    },
  });
};

const getNewsById = async (id: string): Promise<any> => {
  try {
    const response = await apifetch.get(`/News/id?id=${id}`,
      { headers: { Authorization: `Bearer ${"token"}` } }
    );
    if (!response.data) {
      throw new Error("Error");
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Unexpected error");
    }

    throw error;
  }
};
