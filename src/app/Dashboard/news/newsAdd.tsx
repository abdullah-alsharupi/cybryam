import Button from "@/components/ui/button";
import { addNewsType, newsType, newsZodSchema } from "@/app/types/types";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddNews } from "@/mutations/news/addNews";
import { useGetDepartments } from "@/queries/department/useGetAllDepartment";

import { useCookies } from "react-cookie";
import { useSession } from "next-auth/react";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import ToastContainer from "@/components/ui/toastCobtainer";
import AddDepart from "../department/departmentAdd";

interface newsProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  refetch: () => void;
}

export default function NewsAdd({ isOpen, setIsOpen, refetch }: newsProps) {
  const { data: session } = useSession();
  const { data: departmentNames ,refetch:refetchDepartment } = useGetDepartments();
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [addDepartment, setAddDeparment] = useState(false);
  const [Error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [doctroImageUrl, setDoctroImageUrl] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      headline: "",
      title: "",
      img: null,
      user: "",
      department: "",
    },
    resolver: zodResolver(newsZodSchema),
  });

  

  useEffect(() => {
    setIsFormValid(isValid && Object.keys(errors).length == 0);
    const userName = (session?.user as { userName?: string })?.userName;
    if (session?.user) {
      if (userName) {
        setValue("user", userName);
      }
    }
  }, [isValid, errors]);
  
  const mutation = useMutation({
    mutationKey: ["news-add"],
    mutationFn: AddNews,
    onError: (err) => {
      const errorMessage = err.message || "حدث خطأ غير متوقع";
      setError(errorMessage);
    },
    onSuccess: () => {
      refetch();
      setSuccess("تم إضافة الاخبار بنجاح");
    },
  });

  const onSubmit = async (data: addNewsType) => {
    const formData = new FormData();
    formData.append("headline", data.headline);
    formData.append("title", data.title);

    if (data.img) {
      formData.append("img", data.img);
    }
    formData.append("userName", data.user);
    formData.append("depName", data.department);

    mutation.mutate(formData);
  };

  return (
    <div dir="rtl">
      <Modal open={isOpen}>
        {departmentNames?.length>0&&<div>
          <h2 className="text-2xl font-bold mb-4 font-serif text-center">
          إضافة اخبار جديدة
        </h2>
        <form
          encType="multipart/form-data"
          dir="rtl"
          className="grid grid-cols-2 gap-2 justify-start font-serif font-normal text-xl"
          onSubmit={handleSubmit(onSubmit as any)}
        >
          {/* العنوان */}
          <div className="mb-1">
            <label htmlFor="headline" className="block font-medium mb-2">
              العنوان
            </label>
            <Controller
              name="headline"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  id="headline"
                  {...field}
                  placeholder="ادخل العنوان"
                />
              )}
            />
            {errors.headline && (
              <span className="text-red-500 text-[16px]">
                {errors.headline.message}
              </span>
            )}
          </div>

          <div className="mb-1 row-span-2">
            <label htmlFor="title" className="block font-medium mb-2">
              المحتوى
            </label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <textarea id="title" placeholder="ادخل المحتوى" {...field} />
              )}
            />
            {errors.title && (
              <span className="text-red-500 text-[16px]">
                {errors.title.message}
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

          <div className="mb-1">
            <label htmlFor="department" className="block font-medium mb-2">
              اسم القسم
            </label>
            <Controller
              name="department"
              control={control}
              render={({ field }) => (
                <select
                  id="department"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 text-black"
                  {...field}
                >
                  <option value="">اختر...</option>
                  {departmentNames?.map((depart: any,index:number) => (
                    <option key={index} value={depart.depName}>
                      {depart.depName}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.department && (
              <span className="text-red-500 text-[16px]">
                {errors.department.message}
              </span>
            )}
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
        </div>}
        {departmentNames?.length == 0 && (
              <div>
                <h1 className="text-red-700 text-center  font-bold text-[20px]">
                  {" "}
                  يرجى إضافة القسم أولا للإضافة انقر على زر الأضافة
                </h1>
                <div className="flex justify-between mt-4">
                  <Button
                    type="submit"
                    onClick={() => {
                      setAddDeparment(true);
                    }}
                    label={"  إضافة قسم "}
                    className={`w-[40%]  max-sm:w-[30%]  max-sm:h-7  `}
                  />
                  <Button
                    label={"خروج"}
                    onClick={() =>  setIsOpen(false)}
                    className={` bg-red-700 w-[40%] max-sm:w-[30%]  max-sm:h-7 `}
                  />
                </div>
              </div>
            )}
      </Modal>
      <ToastContainer message={Error} type={"error"} />
      <ToastContainer message={success} type={"success"} />
       {addDepartment && (
              <AddDepart
                refetch={refetchDepartment}
                setAdd={setAddDeparment}
                isAdd={addDepartment}
              />
            )}
    </div>
  );
}
