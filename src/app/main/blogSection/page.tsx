"use client";
import Button from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { useGetAllBlog } from "@/queries/blog/useGetAllBlog";
import { Blog } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useBlogStore } from "@/store/blog/useBlogStore";
const BlogSection = () => {
  const bloggg=useBlogStore().globalBlogs
  const heightt = window.screen.height;
  const H = heightt / 2;
  const [hei, setHeight] = useState<number>();
  const router = useRouter();
  const { data: blogPosts, isError, isLoading, refetch } = useGetAllBlog();

  useEffect(() => {
    setHeight(heightt);
    refetch();
  }, [refetch]);

  if (isLoading) {
 return <Loader/>  }

  if (isError) {
    return (
      <div className="text-center p-8 text-red-500">Error loading Blog.</div>
    );
  }
  return (
    <div className="p-8 bg-gray-200 font-serif pb-[70px] h-full">
      <div>
        <h1>
          <a href="/main">Home</a>
          {">"} blog
        </h1>
        <h1 className="text-blue-950 font-bold text-2xl w-auto">
          AL-MAJD Blog
        </h1>
      </div>
      <p className="text-center mb-8 text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque
        suspendisse feugiat lectus nulla ullamcorper porttitor purus enim.
      </p>
      <div
        className={`flex flex-wrap items-center justify-center gap-4 p-8 max-sm:p-0 `}
      >
        {bloggg?.map((post) => (
          <div
            key={post.id}
            className={`bg-white rounded-lg shadow-lg p-4 w-80 h-[450px] max-sm:w-full  `}
          >
            <img
              src={`/images/${post.img}`}
              alt={post.title}
              className="object-cover mb-2 "
            />
            <h3 className="text-lg font-semibold text-pretty">{post.title}</h3>
            <p className="h-[100px] text-pretty overflow-y-hidden ">
              {post.content}
            </p>
            <Button
              className="bg-[#222F66] text-white rounded-full py-2 px-4"
              onClick={() => router.push(`/main/blogSection/${post.id}`)}
            >
              READ MORE
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
