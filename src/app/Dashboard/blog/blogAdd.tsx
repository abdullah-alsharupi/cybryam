import Button from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useSession } from "next-auth/react";
import Input from "@/components/ui/input";
import { BlogSchema, BlogType } from "@/app/types/validate/validate";
import { AddBlog } from "@/mutations/blog/addBlog";
import Modal from "@/components/ui/modal";
import message from "antd/es/message";

interface newsProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  refetch: () => void;
}

export default function BlogAdd({
  isOpen,
  setIsOpen,
  refetch,
}: newsProps) {
  const { data: session } = useSession();
  const [doctroImageUrl, setDoctroImageUrl] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      content: "",
      title: "",
      img: null,
    },
    resolver: zodResolver(BlogSchema),
  });

  const mutation = useMutation({
    mutationKey: ["blog-add"],
    mutationFn: AddBlog,
    onError: (err) => {
      const errorMessage = err.message || "حدث خطأ غير متوقع";
      message.error(errorMessage);
    },
    onSuccess: () => {
      setIsOpen(false);
      refetch();
      message.success("تم إضافة الاخبار بنجاح");
    },
  });

  const onSubmit = async (data: BlogType) => {
    const formData = new FormData();
    formData.append("content", data.content);
    formData.append("title", data.title);

    if (data.img) {
      formData.append("img", data.img);
    }
    mutation.mutateAsync(formData);
  };

  return (
    <div dir="rtl">
      <Modal open={isOpen} >
        <h2 className="text-2xl font-bold mb-4 font-serif text-center">
          إضافة مدونات جديدة
        </h2>
        <form
          encType="multipart/form-data"
          dir="rtl"
          className="grid grid-cols-2 gap-2 justify-start font-serif font-normal text-xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* العنوان */}
          <div className="mb-1">
            <label htmlFor="headline" className="block font-medium mb-2">
              العنوان
            </label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input type="text" {...field} placeholder="ادخل العنوان" />
              )}
            />
            {errors.title && (
              <span className="text-red-500 text-[16px]">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="mb-1 row-span-2">
            <label htmlFor="title" className="block font-medium mb-2">
              المحتوى
            </label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <textarea id="content" placeholder="ادخل المحتوى" {...field} />
              )}
            />
            {errors.content && (
              <span className="text-red-500 text-[16px]">
                {errors.content.message}
              </span>
            )}
          </div>

          <div className="mb-1">
            <label htmlFor="img" className="block font-medium mb-2">
              الصورة
            </label>
            <label
              htmlFor="img-preview"
              className="cursor-pointer items-center bg-black"
            >
              {doctroImageUrl ? (
                <img
                  src={doctroImageUrl}
                  alt="Current"
                  className=" border h-[200px] border-gray-300 row-span-3 focus:outline-none focus:ring focus:border-blue-500 text-black"
                />
              ) : (
                <div className="w-full h-[200px] border border-gray-300 rounded-md flex items-center justify-center">
                  <span>اختر صورة</span>
                </div>
              )}
            </label>
            <input
              type="file"
              id="img-preview"
              className="hidden" // جعل الإدخال غير مرئي
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setDoctroImageUrl(reader.result as string);

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
            <Button type="submit" label={"إضافة"} className={`w-[70px]`} />
            <Button
              label={"إلغاء"}
              onClick={() => {
                control._reset();
                setIsOpen(false);
              }}
              className={`w-[70px] bg-red-700`}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
