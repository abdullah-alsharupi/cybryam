"use client";
import { News } from "@/app/types/types";
import { formatDate, formatDateTime } from "@/app/util/dateFormat";
import Button from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { useGetNews } from "@/queries/news/useGetNews";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";

function NewsPage() {
  const router = useRouter();
  const { data: news, isLoading, isError,refetch } = useGetNews();
  useEffect(()=>{refetch()},[refetch])

  if (isLoading) {
    return <Loader/>  }

  if (isError) {
    return (
      <div className="text-center p-8 text-red-500">Error loading news.</div>
    );
  }
  return (
    <div className="p-8 bg-gray-200 font-serif h-full w-full ">
      <div>
        <h1>
          <a href="/main">Home</a>
          {">"} news
        </h1>
        <h1 className="text-blue-950 font-bold text-2xl w-auto">
          AL-MAJD NEWS
        </h1>
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
        corporis tempore sit molestiae iusto necessitatibus ducimus dolor
        praesentium suscipit reprehenderit eveniet at ratione libero atque
        sapiente ab veritatis, dolore illo!
      </div>
      <div className="flex flex-wrap items-center justify-center gap-8 p-8 ">
        {news?.map((newsItems) => (
          <div key={newsItems.id}>
            <div className="shadow-inner bg-white hover:bg-[#222F66] hover:text-white rounded-xl border-solid p-8 flex flex-col w-[300px]  h-[250px] max-md:h-auto  max-xl:h-[500px] gap-3 justify-between ">
              <h4>{newsItems.headline}</h4>
              <div className="flex items-center gap-4">
                <img src="/icons/books.svg" />
                <h4>{formatDate(new Date(newsItems.createdAt))}</h4>
              </div>
              <h4 className="text-balance overflow-y-hidden h-[100px]">
                {newsItems.title}
              </h4>

              <Button
                label={"Read more"}
                className={
                  "w-[50%] rounded-full top-[-29] bg-blue-950 border border-solid text-black"
                }
                onClick={() => router.push(`/main/news/${newsItems.id}`)}
              ></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsPage;
