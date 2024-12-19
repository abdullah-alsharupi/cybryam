"use client";
import React, { useEffect, useState } from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

import { formatDate, formatDateTime } from "@/app/util/dateFormat";

import DangerDialog from "@/components/ui/danger-dialog";
import ToastContainer from "@/components/ui/toastCobtainer";
import { useMutation } from "@tanstack/react-query";

import Card from "../card/page";
import { useSession } from "next-auth/react";

import { useGetAllBlog } from "@/queries/blog/useGetAllBlog";
import { Blog } from "@/app/types/types";
import BlogAdd from "./blogAdd";
import BlogUpdate from "./BlogUpdate";
import { blogDelete } from "@/mutations/blog/blogDelete";
import Loader from "@/components/ui/loader";
import DynamicTable from "@/components/ui/table";
interface Permission {
  page: string;
  id: string;
  actions: string;
}
export default function BlogTable() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = React.useState(false);
  const [blogId, setBlogId] = React.useState<any>();
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteblogId, setdeleteblogId] = useState("");
  const [Error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { data: blog, isLoading, error, refetch } = useGetAllBlog();
  const [filterBlog, setFilterBlog] = React.useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: session } = useSession();

  const pageName = "Blogs";
  const permissions = (
    session?.user as { permissions?: Permission[] }
  )?.permissions?.find((permission) => permission.page === pageName)?.actions;
  const mutation = useMutation({
    mutationKey: ["delete-blog"],
    mutationFn: blogDelete,
    onSuccess() {
      setSuccess("delete successfully");
      refetch();
    },
    onError(error: any) {
      setError(error);
    },
  });

  const handleDelete = (id: string) => {
    mutation.mutate(id as any);
    setOpenDialog(false);
  };
  const Close = () => {
    setOpenDialog(false);
  };
  useEffect(() => {
    if (blog) {
      setFilterBlog(blog?.map((blogs: any) => ({ ...blogs })));
    }
  }, [blog]);
  const filteredBlog = filterBlog.filter((blogs) =>
    blogs.content?.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  if (isLoading) return <Loader />;
  if (error) return <p>خطأ في جلب البيانات.</p>;
  const columns = [
  

    {
      title: "العنوان",
      render: (item: any) => <div className=" text-wrap">{item.title}</div>,
    },
    {
      title: "المحتوى",
      render: (item: any) => <div className=" text-wrap">{item.content}</div>,
    },
    {
      title: "الصورة",
      render: (item: any) =>
        item.img ? (
          <div className="h-[50px] w-[50px]  text-center  rounded-[50%] ">
            <img
              height={50}
              width={50}
              src={`/images/${item.img}`}
              className="w-full h-full rounded-[50%] object-cover"
              alt="صورة"
            />
          </div>
        ) : (
          "لاتوجد صوره"
        ),
    },

    {
      title: "تاريخ النشر",
      render: (item: any) => formatDateTime(item.createdAt),
    },
    {
      title: "الإجراءات",
      render: (item: any) => (
        <div className="flex justify-around gap-2">
          <Button
            disabled={!permissions?.includes("تعديل")}
            onClick={() => {
              setIsModalOpenUpdate(true);
              setBlogId(item);
            }}
          >
            تعديل
          </Button>
          <Button
            disabled={!permissions?.includes("تعديل")}
            onClick={() => {
              setIsModalOpenUpdate(true);
              setBlogId(item);
            }}
          >
            تعديل
          </Button>

          <Button
            disabled={!permissions?.includes("حذف")}
            className="bg-red-700"
            onClick={() => {
              setdeleteblogId(item.id as string); // استخدم item.id هنا
              setOpenDialog(true);
            }}
          >
            حذف
          </Button>
        </div>
      ),
    },
  ];
  return (
    <>
      {!permissions?.includes("إخفاء الصفحة") && (
        <div className="w-[100%] font-serif overflow-x-auto ">
          <div className="flex flex-row gap-3 mt-2">
            <Button
              disabled={!permissions?.includes("إضافة")}
              onClick={() => setIsModalOpen(true)}
              className={`mr-3 py-[3px] rounded-[10px] border border-solid h-9 mt-1`}
            >
              <img src="/plus.png" width={20} height={20} alt="plus" />
            </Button>
            <BlogAdd
              isOpen={isModalOpen}
              setIsOpen={setIsModalOpen}
              refetch={refetch}
            />
            {isModalOpenUpdate && (
              <BlogUpdate
                blogdata={blogId}
                isOpen={isModalOpenUpdate}
                refetch={refetch}
                setIsOpen={setIsModalOpenUpdate}
              />
            )}
            <input
              type="text"
              placeholder="بحث عن المدونات..."
              className="mb-4 p-2 border border-gray-300 rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div
            className="overflow-x-auto "
            style={{
              height: `${window.innerHeight - window.innerHeight / 5}px`,
              direction: "ltr",
            }}
          >
            <div className="mt-2 mb-2 min-w-full border-x-3 border-gray-200 shadow-2xl shadow-white rounded-2xl">
              <DynamicTable
                columns={columns}
                data={filteredBlog}
                key={blogId}
              />
            </div>
          </div>
          <DangerDialog
            content="هل تريد حذف الاخبار حقاً؟"
            onClose={Close}
            onConfirm={() => handleDelete(deleteblogId)}
            open={openDialog}
            title="حذف اخبار"
          />
          <ToastContainer message={Error} type={"error"} />
          <ToastContainer message={success} type={"success"} />
        </div>
      )}
      {permissions?.includes("إخفاء الصفحة") && "غير مخول لدخول هذه الصفحة"}
    </>
  );
}
