"use client";

import { departmentType, departmentZodSchema } from "@/app/types/types";

import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "@tanstack/react-query";

import { useEffect, useState } from "react";

import { departmentUpdate } from "@/mutations/department/updateDepartment";

import { useCookies } from "react-cookie";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";

import Input from "@/components/ui/input";
import { AlertTitle } from "@mui/material";
import { message } from "antd";

interface departmentProps {
  setUpdating: (isOpen: boolean) => void;

  isUpdating: boolean;
  dataOfDepartment: any;

  refetch: (
    options?: RefetchOptions & RefetchQueryFilters
  ) => Promise<QueryObserverResult<any, any>>;
}

export default function UpdateDeprt({
  isUpdating,
  setUpdating,
  dataOfDepartment,

  refetch,
}: departmentProps) {
  const [cookies] = useCookies(["authToken"]);

  const [departImageUrl, setDepartImageUrl] = useState<string | null>(null);
  const id = dataOfDepartment;
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<departmentType>({
    resolver: zodResolver(departmentZodSchema),
  });

  useEffect(() => {
    if (dataOfDepartment) {
      setValue("depName", dataOfDepartment.depName);
      setValue("description", dataOfDepartment.description || "");

      if (dataOfDepartment.img) {
        setDepartImageUrl(`/images/${dataOfDepartment.img}`);
      }
    }
  }, [dataOfDepartment, setValue]);

  const mutation = useMutation({
    mutationKey: ["updatedepartment"],

    // eslint-disable-next-line react-hooks/rules-of-hooks
    mutationFn: (data: departmentType) =>
      departmentUpdate(data, id?.id, cookies.authToken), // استخدم الدالة المعدلة
    onError: (err: any) => {
      const errorMessage = err.message || "حدث خطأ غير متوقع";

      message.error(errorMessage);
    },
    onSuccess: () => {
      refetch();
      setUpdating(false);
    },
  });

  const onSubmit = (data: departmentType) => {
    const formData = new FormData();

    if (data.img == null) {
      if (dataOfDepartment.img == null) formData.append("img", "");
      else formData.append("img", dataOfDepartment.img);
    } else {
      if (dataOfDepartment.img !== null) {
        const nameImg = `${dataOfDepartment.img}`; // اسم الملف الجديد

        formData.append("nameImg", nameImg);
        formData.append("img", data.img);
      } else {
        formData.append("nameImg", "");
        formData.append("img", data.img);
      }
    }
    formData.append("depName", data.depName || "");

    formData.append("description", (data.description as string) || "");
    mutation.mutateAsync(formData as any);
  };

  return (
    <div dir="rtl">
      <Modal open={isUpdating}>
        <h2 className="text-2xl font-bold mb-4 font-serif text-center">
          تعديل قسم جديد
        </h2>
        <form
          dir="rtl"
          className="grid grid-cols-2 gap-2 justify-start font-serif font-normal text-xl"
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
              {departImageUrl ? (
                <img
                  src={departImageUrl}
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
                    setDepartImageUrl(reader.result as string);
                    setValue("img", file as any); // تحديث قيمة الصورة في النموذج
                  };
                  reader.readAsDataURL(file);
                }
                //  else {

                //   setValue("img", null); // إذا لم يتم اختيار ملف، قم بتحديث القيمة إلى null
                // }
              }}
            />
          </div>

          <div className="col-span-2 flex justify-between items-center">
            <Button type="submit" label={"تعديل"} className={`w-[40%]`} />
            <Button
              label={"إلغاء"}
              onClick={() => setUpdating(false)}
              className={`w-[40%] bg-red-700`}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
