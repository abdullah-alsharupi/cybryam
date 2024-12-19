"use client";
import { hospitalType, hospitalZodSchema } from "@/app/types/types";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import ToastContainer from "@/components/ui/toastCobtainer";
import { AddHospital } from "@/mutations/hospital/addHospital";
import { zodResolver } from "@hookform/resolvers/zod";
import { QueryObserverResult, RefetchOptions, useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { resolve } from "path";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
interface HosptialProps {
  isAdd: boolean;
  setAdd: (isOpen: boolean) => void;
  refetch: any;
}
export default function HospialAdd({ isAdd, setAdd, refetch }: HosptialProps) {
  const [addHospital, setAddHospital] = useState<boolean>();
  const [success, setSuccess] = useState("");
  const [hospitalImageUrl, setHospitalImageUrl] = useState<string | null>(null);

  const {
    setValue,
    control,reset,
    handleSubmit,
    formState: { errors },
  } = useForm<hospitalType>({
    defaultValues: {
      description: "",
      email: "",
      name: "",
      phone: "",
      telephone: "",
      vision: "",
      
    },
    resolver: zodResolver(hospitalZodSchema),
  });
  const mutation=useMutation({
    mutationKey:['add-hosptial'],
    mutationFn:AddHospital,
    onError(error, variables, context) {
        
        message.error(error.message)
    },
    onSuccess:()=>{
        
         reset()
         setHospitalImageUrl(null)
         refetch()
        
    }
  })
  const onSubmit = (data: hospitalType) => {
    const formData = new FormData();
    formData.append('name',data.name)
    formData.append('email',data.email)
    formData.append('phone',data.phone)
    if(data.img==null){
      formData.append('img','')
    }else
    formData.append('img',data.img as File || null)
    formData.append('telephone',data.telephone)
    formData.append('description',data.description)
    formData.append('vision',data.vision)
    formData.append('goal',data.goal)
    formData.append('message',data.message)
    console.log(data.img)
    
mutation.mutateAsync(formData)
  };
  return (
    <div dir="rtl">
      <Modal open={isAdd} width={600} className="top-[1%]  w-[700px]">
        <h2 className="text-2xl font-bold max-sm:text-[18px]  font-serif text-center">
          إضافة فرع جديد
        </h2>
        <form
          dir="rtl"
          className="grid sm:grid-cols-8 max-sm:gap-x-2 max-sm:mb-3 gap-x-2 max-sm:text-[15px] font-serif sm:font-normal sm:text-xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className=" sm:col-span-4 max-sm:col-span-4 ">
            <label htmlFor="name" className="block font-medium mb-2">
              اسم الفرع
            </label>
            <Controller
              defaultValue=""
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  className="h-[40px]"
                  id="name"
                  {...field}
                  placeholder="ادخل اسم الفرع"
                />
              )}
            />
            {errors.name && (
              <span className="text-red-500 text-[16px]">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className=" sm:col-span-4 max-sm:col-span-4">
            <label htmlFor="email" className="block font-medium mb-2">
              الإيميل
            </label>
            <Controller
              defaultValue=""
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                className="h-[40px]"
                  type="email"
                  id="email"
                  {...field}
                  placeholder="ادخل التخصص"
                />
              )}
            />
            {errors.email && (
              <span className="text-red-500 text-[16px]">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="  sm:col-span-4 max-sm:col-span-4">
            <label htmlFor="phone" className="block font-medium mb-2">
              رقم الهاتف
            </label>
            <Controller
              defaultValue=""
              name="phone"

              control={control}
              render={({ field }) => (
                <Input
                className="h-[40px]"
                  type="text"
                  id="phone"
                  {...field}
                  placeholder="ادخل رقم الهاتف"
                />
              )}
            />
            {errors.phone && (
              <span className="text-red-500 text-[16px]">
                {errors.phone.message}
              </span>
            )}
          </div>
          <div className="  sm:col-span-4 max-sm:col-span-4">
            <label htmlFor="telephone" className="block font-medium mb-2">
              رقم الهاتف
            </label>
            <Controller
              defaultValue=""
              name="telephone"
              control={control}
              render={({ field }) => (
                <Input
                className="h-[40px]"
                  type="text"
                  id="phone"
                  {...field}
                  placeholder="ادخل رقم الهاتف"
                />
              )}
            />
            {errors.telephone && (
              <span className="text-red-500 text-[16px]">
                {errors.telephone.message}
              </span>
            )}
          </div>
          <div className=" sm:col-span-4 max-sm:col-span-4">
            <label htmlFor="vision" className="block font-medium mb-2">
              الرؤية
            </label>
            <Controller
              defaultValue=""
              name="vision"
              control={control}
              render={({ field }) => (
                <textarea
                  id="vision"
                  className="w-full border border-gray-300 rounded-md h-[70px] max-sm:h-[50px] row-span-5  focus:outline-none focus:ring focus:border-blue-500 text-black"
                  placeholder="ادخل الرؤية"
                  {...field}
                />
              )}
            />
            {errors.vision && (
              <span className="text-red-500 text-[16px]">
                {errors.vision.message}
              </span>
            )}
          </div>
          <div className=" sm:col-span-4 max-sm:col-span-4">
            <label htmlFor="goal" className="block font-medium mb-2">
              الهدف
            </label>
            <Controller
              defaultValue=""
              name="goal"
              control={control}
              render={({ field }) => (
                <textarea
                  id="goal"
                  className="w-full border border-gray-300 rounded-md h-[70px] max-sm:h-[50px] row-span-5  focus:outline-none focus:ring focus:border-blue-500 text-black"
                  placeholder="ادخل الهدف"
                  {...field}
                />
              )}
            />
            {errors?.goal && (
              <span className="text-red-500 text-[16px]">
                {errors.goal?.message}
              </span>
            )}
          </div>
          <div className=" col-span-4  max-sm:col-span-4">
            <label htmlFor="message" className=" block font-medium">
              الرسالة
            </label>
            <Controller
              defaultValue=""
              name="message"
              control={control}
              render={({ field }) => (
                <textarea
                  id="message"
                  className="w-full border border-gray-300 rounded-md h-[70px] max-sm:h-[50px] row-span-5  focus:outline-none focus:ring focus:border-blue-500 text-black"
                  placeholder="ادخل الرسالة"
                  {...field}
                />
              )}
            />
            {errors.message && (
              <span className="text-red-500 text-[16px]">
                {errors.message.message}
              </span>
            )}
          </div>
          <div className=" col-span-4  max-sm:col-span-4">
            <label htmlFor="description" className=" block font-medium">
              معلومات المستشفى
            </label>
            <Controller
              defaultValue=""
              name="description"
              control={control}
              render={({ field }) => (
                <textarea
                  id="description"
                  className="w-full border border-gray-300 rounded-md h-[70px] max-sm:h-[50px] row-span-5  focus:outline-none focus:ring focus:border-blue-500 text-black"
                  placeholder="ادخل معلومات عن المستشفى"
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
        
          <div className="mb-1 row-span-3 col-span-8 max-sm:col-span-8 ">
           
            <label
              htmlFor="img-preview"
              className="cursor-pointer items-center bg-black"
            >
              {hospitalImageUrl ? (
                <img
                  src={hospitalImageUrl}
                  alt="Current"
                  className=" border h-[100px] max-sm:h-[50px] object-cover w-full border-gray-300 row-span-3 focus:outline-none focus:ring focus:border-blue-500 text-black"
                />
              ) : (
                <div className="w-full h-[100px] max-sm:h-[50px] border border-gray-300 rounded-md flex items-center justify-center">
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
                    setHospitalImageUrl(reader.result as string);
                    setValue("img", file as any); // تحديث قيمة الصورة في النموذج
                  };
                  reader.readAsDataURL(file);
                } else {
                  setValue("img", null); // إذا لم يتم اختيار ملف، قم بتحديث القيمة إلى null
                }
              }}
            />
          </div>

          <div className="col-span-8  flex justify-around  items-center">
            <Button
              type="submit"
              label={"تعديل"}
              className={`w-[40%] max-sm:w-[30%]  max-sm:h-7 `}
            />

            <Button
              label={"خروج"}
              onClick={() => setAdd(false)}
              className={` bg-red-700 w-[40%] max-sm:w-[30%]  max-sm:h-7 `}
            />
          </div>
        </form>
      </Modal>
      <ToastContainer message={success} type={"success"} />
    </div>
  );
}
