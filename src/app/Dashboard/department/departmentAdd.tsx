"use client";

import {
  departmentType,
  departmentZodSchema,
  doctorZodSchema,
  doctroType,
} from "@/app/types/types";
import { doctorAdd } from "@/mutations/doctors/addDoctor";
import { message } from "antd";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "@tanstack/react-query";
import { useGetDepartments } from "@/queries/department/useGetAllDepartment";
import { useState } from "react";
import { departmentAdd } from "@/mutations/department/addDepartment";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";

interface addDepartProps {
  isAdd: boolean;
  setAdd: (isOpen: boolean) => void;
  refetch: (
    options?: RefetchOptions & RefetchQueryFilters
  ) => Promise<QueryObserverResult<any, any>>;
}

export default function AddDepart({ isAdd, setAdd, refetch }: addDepartProps) {
  const [doctroImageUrl, setDoctroImageUrl] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<departmentType>({
    resolver: zodResolver(departmentZodSchema),
  });
  const setData = () => {
    setValue("depName", "");
  };
  const mutation = useMutation({
    mutationKey: ["add-Department"],
    mutationFn: departmentAdd,
    onError: (error) => {
      message.error("حدث خطأ أثناء إضافة القسم: " + error.message); // عرض رسالة الخطأ للمستخدم
    },
    onSuccess: () => {
      setData();
      refetch();
      reset();
      message.success("تم إضافة القسم بنجاح");
    },
  });

  const department: departmentType = {
    depName: control._getWatch("depName"),
    img: control._getWatch("img"),
  };
  const onSubmit = (data: departmentType) => {
    const formData = new FormData();
    formData.append("depName", data.depName || "");
    if (data.img == null) {
      formData.append("img", "");
    } else formData.append("img", (data.img as File) || null);
    formData.append("description", (data.description as string) || "");
    mutation.mutate(formData);
  };

  return (
    <div dir="rtl">
      <Modal open={isAdd}>
        <h2 className="text-2xl font-bold mb-4 font-serif text-center">
          إضافة قسم جديد
        </h2>
        <form
          dir="rtl"
          className=" gap-2 justify-start font-serif font-normal text-xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <label htmlFor="depName" className="block font-medium mb-2">
              اسم القسم
            </label>
            <Controller
              name="depName"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  id="depName"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 text-black"
                  {...field}
                  placeholder="ادخل اسم القسم"
                />
              )}
            />
            {errors.depName && (
              <span className="text-red-500 text-[16px]">
                {errors.depName.message}
              </span>
            )}
          </div>
          <div className="mb-4 border-solid rounded border-[1px] overflow-hidden">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <textarea
                  className="w-full p-2"
                  id="description"
                  placeholder="ادخل المحتوى"
                  {...field}
                />
              )}
            />
            {errors.description && (
              <span className="text-red-500 text-[16px]">
                {errors.description.message}
              </span>
            )}
          </div>
          <div className="mb-4 row-span-3 col-span-3 ">
            <label htmlFor="img" className="block ">
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
                  className=" border w-full h-[200px] object-cover border-gray-300 row-span-3 focus:outline-none focus:ring focus:border-blue-500 text-black"
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
          {errors.img && (
            <span className="text-red-500 text-[16px]">
              {errors.img.message}
            </span>
          )}
          <div className="col-span-2 flex justify-between items-center">
            <Button type="submit" label={"إضافة"} className={`w-[30%]`} />
            <Button
              label={"خروج"}
              onClick={() => setAdd(false)}
              className={`w-[30%] bg-red-700`}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
