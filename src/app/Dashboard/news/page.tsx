"use client";
import React, { useEffect, useState } from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { useGetNews } from "@/queries/news/useGetNews";
import NewsAdd from "./newsAdd";
import { formatDateTime } from "@/app/util/dateFormat";
import NewsUpdate from "./newsupdate";
import DangerDialog from "@/components/ui/danger-dialog";
import { useMutation } from "@tanstack/react-query";
import { deleteNews } from "@/mutations/news/deleteNews";
import Card from "../card/page";
import { useSession } from "next-auth/react";
import DynamicTable from "@/components/ui/table";
import ToastContainer from "@/components/ui/toastCobtainer";

interface Permission {
  page: string;
  id: string;
  actions: string;
}

export default function NewsTable():React.JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [newsId, setNewsId] = useState<any>();
  const [openDialog, setOpenDialog] = useState(false);
  const [deletenewsId, setdeletenewsId] = useState("");
  const [Error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { data: news, isLoading, error, refetch } = useGetNews();
  const [filterNews, setFilterNews] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: session } = useSession();
  const pageName = "News";
  const permissions = (
    session?.user as { permissions?: Permission[] }
  )?.permissions?.find((permission) => permission.page === pageName)?.actions;

  const mutation = useMutation({
    mutationKey: ["delete-News"],
    mutationFn: deleteNews,
    onSuccess() {
      setSuccess("تم الحذف بنجاح");
      refetch();
    },
    onError(error: any) {
      setError(error);
    },
  });

  const handleDelete = (id: string) => {
    mutation.mutate(id);
    setOpenDialog(false);
  };

  const Close = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    if (news) {
      setFilterNews(news?.map((newss: any) => ({ ...newss })));
    }
  }, [news]);

  const filteredNews = filterNews.filter((newss) =>
    newss.headline?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <p>جاري جلب البيانات...</p>;
  if (error) return <p>خطأ في جلب البيانات.</p>;

  const columns = [
   

    { title: "الموضوع", render:(item:any)=>
      <div className=" text-wrap">
        {item.headline}
      </div>
          },
    { title: "المحتوى", render:(item:any)=>
<div className=" text-wrap">
  {item.title}
</div>
    },
    {
      title: "الصورة",
      render: (item: any) =>
        item.img ? (
         <div className="h-[50px] w-[50px]  ">
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
      title: "المستخدم",
      render: (item: any) => item.user?.userName || "غير متوفر",
    },
    {
      title: "القسم",
      render: (item: any) => item.department?.depName || "غير متوفر",
    },
    {
      title: "تاريخ النشر",
      render: (item: any) => formatDateTime(item.createdAt),
    },
    {
      title: "الإجراءات",
      render: (item: any) => (
        <div className="flex justify-around gap-4">
          <Button
            disabled={!permissions?.includes("تعديل")}
            onClick={() => {
              setIsModalOpenUpdate(true);
              setNewsId(item);
            }}
          >
            تعديل
          </Button>

          <Button
            disabled={!permissions?.includes("حذف")}
            className="bg-red-700"
            onClick={() => {
              setdeletenewsId(item.id as string); // استخدم item.id هنا
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
              className="mr-3 py-[3px] rounded-[10px] border border-solid h-9 mt-1"
            >
              <img src="/plus.png" width={20} height={20} alt="plus" />
            </Button>
            <NewsAdd
              isOpen={isModalOpen}
              setIsOpen={setIsModalOpen}
              refetch={refetch}
            />
            {isModalOpenUpdate && (
              <NewsUpdate
                newsdata={newsId}
                isOpen={isModalOpenUpdate}
                refetch={refetch}
                setIsOpen={setIsModalOpenUpdate}
              />
            )}
            <input
              type="text"
              placeholder="بحث عن الأخبار..."
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
                <DynamicTable columns={columns} data={filteredNews} key={newsId}/>
              </div>
          
          </div>
          <DangerDialog 
            content="هل تريد حذف الأخبار حقاً؟"
            onClose={Close}
            onConfirm={() => handleDelete(deletenewsId)}
            open={openDialog}
            title="حذف أخبار"
          />
          <ToastContainer message={Error} type={"error"} />
          <ToastContainer message={success} type={"success"} />
        </div>
      )}
    </>
  );
}
