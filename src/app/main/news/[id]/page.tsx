"use client";

import { News } from "@/app/types/types";
import { formatDate } from "@/app/util/dateFormat";
import { useGetNewsById } from "@/queries/news/useGetnewsById";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";

const NewsDetails = () => {
  const { id: newsId } = useParams();
  console.log(newsId)
  const {
    data: newsdata,
    isLoading,
    isError,
    refetch,
  } = useGetNewsById(newsId as string);
  useEffect(() => {
    refetch();
  }, [newsId]);
  if (isLoading) {
    return <div className="text-center p-8">Loading news...</div>;
  }

  if (isError) {
    return (
      <div className="text-center p-8 text-red-500">Error loading news.</div>
    );
  }

  if (!newsdata) {
    return <div>No news found.</div>;
  }

  return (
    <div className="p-8 font-serif h-auto w-auto flex items-center justify-center">
      {[newsdata]?.map((news) => (
        <div key={news.id} className="w-[80%] ">
          <div className="shadow-inner bg-white  rounded-xl border-solid p-8 flex flex-col max-md:h-auto max-xl:h-[500px] gap-3 justify-between items-center">
            <h1 className="font-bold text-2xl">{news.headline}</h1>
            <img
              src={`/images/${news.img}`}
              alt="Icon"
              className="object-cover h-[20%] "
            />

            <p className="opacity-50">{news.title}</p>
            <h4>published date :{formatDate(new Date(news.createdAt))}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsDetails;
