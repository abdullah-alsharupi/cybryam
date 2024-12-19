"use client";
import { useGetBlogById } from "@/queries/blog/useGetBlogsById";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const BlogDetails = () => {
  const { id: blogId } = useParams();
  const {
    data: blog,
    isLoading,
    isError,
    refetch,
  } = useGetBlogById(blogId as string);
  useEffect(() => {
    refetch();
  }, [blogId]);
  if (isLoading) {
    return <div className="text-center p-8">Loading Blog...</div>;
  }

  if (isError) {
    return (
      <div className="text-center p-8 text-red-500">Error loading Blog.</div>
    );
  }

  return (
    blog && (
      <div className="p-8 font-serif h-auto w-auto flex items-center justify-center">
        {[blog]?.map((blog) => (
          <div key={blog.id} className="w-[80%] ">
            <div className="shadow-inner bg-white  rounded-xl border-solid p-8 flex flex-col max-md:h-auto max-xl:h-[500px] gap-3 justify-between items-center">
              <p className="font-bold text-2xl">{blog.title}</p>
              <img
                src={`/images/${blog.img}`}
                alt="Icon"
                className="object-cover h-[20%] "
              />

              <p>{blog.content}</p>
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default BlogDetails;
