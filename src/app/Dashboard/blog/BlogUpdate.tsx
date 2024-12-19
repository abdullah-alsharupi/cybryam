"use client";

import Button from "@/components/ui/button";
import { newsZodSchema } from "@/app/types/types"; // تأكد من استيراد الزود
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input";
import { BlogSchema, BlogType } from "@/app/types/validate/validate";
import { UpdateBlog } from "@/mutations/blog/updateBlog";
import Modal from "@/components/ui/modal";

interface blogProps {
  isOpen: boolean;
  blogdata?: any;
  setIsOpen: (isOpen: boolean) => void;
  refetch: (
    options?: RefetchOptions & RefetchQueryFilters
  ) => Promise<QueryObserverResult<any, any>>;
}

export default function BlogUpdate({
  isOpen,
  setIsOpen,
  blogdata,
  refetch,
}: blogProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const id = blogdata.id;
  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      content: "",
      title: "",
      img: null, // يجب أن تكون null هنا
    },
    resolver: zodResolver(BlogSchema),
  });

  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    if (blogdata) {
      setValue("content", blogdata.content || "");
      setValue("title", blogdata.title || "");
      setCurrentImage(blogdata.img || "");
      if (blogdata.img) {
        setPreviewUrl(`/images/${blogdata.img}`);
      }
    }
  }, [blogdata, setValue]);
  const mutation = useMutation({
    mutationKey: ["blog-update"],
    mutationFn: (data: any) => UpdateBlog(data, id),
    onError: (err) => {
      const errorMessage = err.message || "حدث خطأ غير متوقع";
      message.error(errorMessage);
    },

    onSuccess: () => {
      message.success("تم تحديث المدونة بنجاح");
      refetch();
      setIsOpen(false);
    },
  });
  //   const [isFormValid, setIsFormValid] = React.useState(false);
  //   useEffect(() => {
  //     setIsFormValid(isValid && Object.keys(errors).length == 0);
  //   }, [isValid, errors]);
  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("content", data.content);
    formData.append("title", data.title);
    formData.append("id", data.id);
    if (data.img == null) {
      if (blogdata.img == null) formData.append("img", "");
      else formData.append("img", blogdata.img);
    } else {
      
      if (blogdata.img !== null) {
        const nameImg = `${blogdata.img}`; // اسم الملف الجديد

        formData.append("nameImg", nameImg);
        formData.append("img", data.img);
      } else {
        formData.append("nameImg", "");
        formData.append("img", data.img);
      }
    }
    mutation.mutate(formData);
   
  };

  return (
    <div dir="rtl">
      <Modal open={isOpen} >
        <h2 className="text-2xl font-bold mb-4 font-serif text-center">
          تعديل المدونة
        </h2>
        <form
          encType="multipart/form-data"
          dir="rtl"
          className="grid grid-cols-2 gap-2 justify-start font-serif font-normal text-xl"
        >
          <div className="mb-1">
            <label htmlFor="title" className="block font-medium mb-2">
              العنوان
            </label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  id="title"
                  {...field}
                  placeholder="ادخل العنوان"
                />
              )}
            />
            {errors.title && (
              <span className="text-red-500 text-[16px]">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="mb-1 row-span-2">
            <label htmlFor="content" className="block font-medium mb-2">
              المحتوى
            </label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <textarea
                  id="content"
                  className="w-full border border-gray-300 rounded-md py-2 h-[250px] px-3 focus:outline-none focus:ring focus:border-blue-500 text-black"
                  placeholder="ادخل المحتوى"
                  {...field}
                />
              )}
            />
            {errors.content && (
              <span className="text-red-500 text-[16px]">
                {errors.content.message}
              </span>
            )}
          </div>

          <div className="mb-1">
            <label htmlFor="img" className="block ">
              الصورة
            </label>
            <label
              htmlFor="img-preview"
              className="cursor-pointer items-center bg-black"
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Current"
                  className=" border h-[200px] border-gray-300 row-span-3 focus:outline-none focus:ring focus:border-blue-500 text-black"
                />
              ) : (
                <div className="w-full h-[170px] border border-gray-300 rounded-md flex items-center justify-center">
                  <span>اختر صورة</span>
                </div>
              )}
            </label>
            <input
              type="file"
              id="img-preview"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];

                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setPreviewUrl(reader.result as string);
                    setValue("img", file as any); // تحديث قيمة الصورة في النموذج
                  };
                  reader.readAsDataURL(file);
                } else {
                  setValue("img", null); // إذا لم يتم اختيار ملف، قم بتحديث القيمة إلى null
                }
              }}
            />
          </div>

          <div className="col-span-2 flex justify-between items-center">
            <Button
              onClick={handleSubmit(onSubmit)}
              label={"تحديث"}
              className={`w-[70px]`}
            />
            <Button
              label={"إلغاء"}
              onClick={() => {
                setIsOpen(false);
                control._reset();
              }}
              className={`w-[70px] bg-red-700`}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
